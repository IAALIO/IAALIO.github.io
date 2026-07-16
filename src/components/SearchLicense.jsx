import { useState } from 'react'
import { Search, Loader2, CheckCircle2, XCircle, Download, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'
import { jsPDF, GState } from 'jspdf'
import iaaLogo from '../assets/images/iaa-logo.png'

function parseCSVLine(line) {
  const result = []
  let current = ''; let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') inQuotes = !inQuotes
    else if (c === ',' && !inQuotes) { result.push(current.trim()); current = '' }
    else current += c
  }
  result.push(current.trim())
  return result
}

function getDirectImageUrl(url) {
  if (!url) return ''
  const m = url.match(/\/file\/d\/([^/]+)/)
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w400`
  return /^https?:\/\//i.test(url) ? url : ''
}

function getGDriveFileUrl(url) {
  if (!url) return ''
  const m = url.match(/\/file\/d\/([^/]+)/)
  if (m) return `https://drive.google.com/file/d/${m[1]}/view`
  return /^https?:\/\//i.test(url) ? url : ''
}

function isUrl(str) { return /^https?:\/\//i.test(str) }

const SearchLicense = () => {
  const { t, lang } = useLang()
  const [docId, setDocId] = useState('')
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!docId) return
    setStatus('loading')
    try {
      const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcLOEKNE8N8-dRiH9ZhFxxbpK59mSE8gc-Of1wya6QH6HuOQvs1l6pFnxM35HoUhUsOCI12p03n5YY/pub?output=csv'
      const res = await fetch(CSV_URL)
      const text = await res.text()
      const lines = text.split('\n').filter(l => l.trim())
      const rows = lines.slice(1).map(line => parseCSVLine(line))
      const row = rows.find(r =>
        (r[0] && r[0].trim() === docId.trim()) ||
        (r[1] && r[1].trim() === docId.trim())
      )
      if (row) {
        setResult({
          id: row[0], id_tramite: row[1], nombre: row[2],
          validoHasta: row[3], estado: row[4], tipo: row[5],
          link: row[6] || '', fechaNacimiento: row[7] || '',
          nacionalidad: row[8] || '', estatura: row[9] || '',
          tipoSangre: row[10] || '', colorOjos: row[11] || '',
          fotoUrl: getDirectImageUrl(row[12] || ''),
          fotoOriginal: getGDriveFileUrl(row[12] || ''),
          paisValido: row[13] || '',
        })
        setStatus('found')
      } else setStatus('not_found')
    } catch (err) { console.error(err); setStatus('not_found') }
  }

  const generatePDF = async () => {
    if (!result) return
    try {
      const doc = new jsPDF('p', 'mm', 'a4')
      const pw = doc.internal.pageSize.getWidth()
      const ph = doc.internal.pageSize.getHeight()

      const loadImage = (src, cors) => new Promise(resolve => {
        const i = new Image()
        if (cors) i.crossOrigin = 'anonymous'
        i.onload = () => resolve(i)
        i.onerror = () => resolve(null)
        i.src = src
      })

      const [iaaImg, fotoImg] = await Promise.all([
        loadImage(iaaLogo),
        result.fotoUrl ? loadImage(result.fotoUrl, true) : null,
      ])

      try {
        if (iaaImg) {
          const wmW = 100; const wmH = (iaaImg.height / iaaImg.width) * wmW
          doc.setGState(new GState({ opacity: 0.2 }))
          doc.addImage(iaaImg, 'PNG', (pw - wmW) / 2, (ph - wmH) / 2, wmW, wmH)
          doc.setGState(new GState({ opacity: 1 }))
        }
      } catch {}

      const endorseText = lang === 'es' ? 'Avalado por IAA · ONU · FIA' : 'Endorsed by IAA · UN · FIA'

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16); doc.text('INTERNATIONAL DRIVING PERMIT', pw / 2, 20, { align: 'center' })
      doc.text('PERMISO INTERNACIONAL DE CONDUCIR', pw / 2, 28, { align: 'center' })
      doc.setFontSize(9); doc.setFont('helvetica', 'normal')
      doc.text('IAA - License International Official', pw / 2, 36, { align: 'center' })
      doc.setFontSize(8); doc.setFont('helvetica', 'bold')
      doc.text(endorseText, pw / 2, 42, { align: 'center' })
      doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
      doc.line(20, 47, pw - 20, 47)
      doc.setFontSize(11); doc.setFont('helvetica', 'bold')
      const fields = [
        ['1. Holder / Titular', result.nombre || ''],
        ['2. Date of Birth / F. Nacimiento', result.fechaNacimiento || ''],
        ['3. Nationality / Nacionalidad', result.nacionalidad || ''],
        ['4. Height / Estatura', result.estatura || ''],
        ['5. Blood Type / Tipo Sangre', result.tipoSangre || ''],
        ['6. Eye Color / Color Ojos', result.colorOjos || ''],
        ['7. Document N° / N° Documento', result.id || ''],
        ['8. Application ID / ID Trámite', result.id_tramite || ''],
        ['9. Category / Categoría', result.tipo || ''],
        ['10. Valid Until / Válido Hasta', result.validoHasta || ''],
        ['11. Status / Estado', result.estado || ''],
      ]
      let y = 55
      fields.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10)
        doc.text(label, 25, y); doc.setFont('helvetica', 'normal')
        doc.text(': ' + value, 85, y); y += 9
      })

      try {
        if (fotoImg) {
          const fotoW = 55; const fotoH = Math.min((fotoImg.height / fotoImg.width) * fotoW, 70)
          doc.addImage(fotoImg, 'JPEG', 150, 55, fotoW, fotoH)
          doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
          doc.rect(150, 55, fotoW, fotoH)
        }
      } catch {}

      doc.setDrawColor(200); doc.setLineWidth(0.3)
      doc.line(20, y + 5, pw - 20, y + 5); y += 14
      doc.setFontSize(8); doc.setFont('helvetica', 'italic')
      doc.text(lang === 'es'
        ? 'Documento oficial. Debe portarse con su licencia original. Emitido por IAA - License International Official.'
        : 'Official document. Must be carried with your original license. Issued by IAA - License International Official.',
        pw / 2, y, { align: 'center', maxWidth: 170 })
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7)
      doc.text(`IAA - License International Official — ${endorseText}`, pw / 2, 290, { align: 'center' })
      doc.save(`LIO-License-${result.id || result.id_tramite}.pdf`)
    } catch (e) {
      console.error('PDF generation error:', e)
    }
  }

  return (
    <section id="verificar" className="py-16 bg-bg-section border-b border-primary-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">Verification</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-2">{t.search.title}</h2>
          <p className="text-text-muted">{t.search.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg shadow-primary/5 border border-primary-light overflow-hidden">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row p-2 gap-2 bg-bg-section m-2 rounded-lg border border-primary-light">
            <input
              type="text" placeholder={t.search.placeholder}
              value={docId} onChange={(e) => setDocId(e.target.value)}
              className="flex-1 px-4 py-3.5 border-0 bg-transparent outline-none text-text-main"
            />
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 text-sm disabled:opacity-50 w-full sm:w-auto" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              <span>{t.search.search}</span>
            </button>
          </form>

          <AnimatePresence>
            {status === 'found' && result && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-4 sm:p-6 border-t border-primary-light">
                <div className="bg-white rounded-xl border border-primary-light shadow-sm card-hover p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary-light flex-wrap">
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                      <img src={iaaLogo} alt="IAA" className="h-8 w-auto" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-primary text-sm truncate">IAA - License International Official</p>
                      <p className="text-[9px] text-text-muted uppercase tracking-wider">{t.search.issuedBy}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">{t.search.valid}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {result.fotoUrl && (
                      <div className="shrink-0 flex justify-center sm:block">
                        <div className="w-full sm:w-52 sm:h-52 rounded-xl border-2 border-primary-light overflow-hidden bg-white shadow-sm">
                          <img src={result.fotoUrl} alt="Holder" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<a href=\"${result.fotoOriginal || result.fotoUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-full h-full flex items-center justify-center text-accent text-[10px] font-semibold hover:underline\">${lang === 'es' ? 'Ver Foto' : 'View Photo'}</a>` }} />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-primary mb-1 text-center sm:text-left">{result.nombre}</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                        <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.docNum}</span>
                          <p className="font-semibold text-primary text-sm break-words">{result.id}</p>
                        </div>
                        {result.id_tramite && <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.idTramite}</span>
                          <p className="font-semibold text-primary text-sm break-words">{result.id_tramite}</p>
                        </div>}
                        <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.nationality}</span>
                          <p className="font-semibold text-primary text-sm break-words">{result.nacionalidad}</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.dob}</span>
                          <p className="font-semibold text-primary text-sm">{result.fechaNacimiento}</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.category}</span>
                          <p className="font-semibold text-primary text-sm">{result.tipo}</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.validUntil}</span>
                          <p className="font-semibold text-primary text-sm">{result.validoHasta}</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.status}</span>
                          <p className="font-semibold text-green-700 text-sm capitalize">{result.estado}</p>
                        </div>
                        {result.estatura && <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.height}</span>
                          <p className="font-semibold text-primary text-sm">{result.estatura}</p>
                        </div>}
                        {result.tipoSangre && <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.bloodType}</span>
                          <p className="font-semibold text-primary text-sm">{result.tipoSangre}</p>
                        </div>}
                        {result.colorOjos && <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.eyeColor}</span>
                          <p className="font-semibold text-primary text-sm">{result.colorOjos}</p>
                        </div>}
                        {result.paisValido && <div>
                          <span className="text-[9px] text-text-muted uppercase font-bold tracking-widest">{t.search.validCountry}</span>
                          <p className="font-semibold text-primary text-sm">{result.paisValido}</p>
                        </div>}
                      </div>
                    </div>
                  </div>

                  {result.link && (
                    <div className="mt-3 pt-3 border-t border-primary-light">
                      <div className="mt-1">
                        {isUrl(result.link) ? (
                          <a href={result.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:underline">
                            <ExternalLink size={14} /> {lang === 'es' ? 'Abrir Documento' : 'Open Document'}
                          </a>
                        ) : (
                          <span className="text-primary font-semibold text-sm break-words">{result.link}</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-primary-light flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-[9px] text-text-muted italic text-center sm:text-left">{t.search.footer}</p>
                    <button onClick={generatePDF} className="btn-outline flex items-center justify-center gap-2 text-sm py-2 px-4 w-full sm:w-auto">
                      <Download size={15} /> {t.search.download}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'not_found' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-8 border-t border-primary-light text-center">
                <div className="inline-flex bg-red-50 text-red-600 p-3 rounded-full mb-4">
                  <XCircle size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{t.search.notFound}</h3>
                <p className="text-sm text-text-muted">{t.search.notFoundDesc} <b>{docId}</b>.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default SearchLicense
