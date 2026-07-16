import { useState } from 'react'
import { Search, Loader2, CheckCircle2, XCircle, Download, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'
import { jsPDF } from 'jspdf'

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
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
  return url
}

function getGDriveFileUrl(url) {
  if (!url) return ''
  const m = url.match(/\/file\/d\/([^/]+)/)
  if (m) return `https://drive.google.com/file/d/${m[1]}/view`
  return url
}

function isUrl(str) {
  return /^https?:\/\//.test(str)
}

const SearchLicense = () => {
  const { t, lang } = useLang()
  const [docId, setDocId] = useState('')
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [imgError, setImgError] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!docId) return
    setStatus('loading'); setImgError(false)
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
        const rawFoto = row[12] || ''
        setResult({
          id: row[0], id_tramite: row[1], nombre: row[2],
          validoHasta: row[3], estado: row[4], tipo: row[5],
          link: row[6] || '', fechaNacimiento: row[7] || '',
          nacionalidad: row[8] || '', estatura: row[9] || '',
          tipoSangre: row[10] || '', colorOjos: row[11] || '',
          fotoUrl: getDirectImageUrl(rawFoto),
          fotoOriginal: getGDriveFileUrl(rawFoto),
        })
        setStatus('found')
      } else {
        setStatus('not_found')
      }
    } catch (err) {
      console.error(err)
      setStatus('not_found')
    }
  }

  const generatePDF = () => {
    if (!result) return
    const doc = new jsPDF('p', 'mm', 'a4')
    const pw = doc.internal.pageSize.getWidth()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('INTERNATIONAL DRIVING PERMIT', pw / 2, 20, { align: 'center' })
    doc.text('PERMISO INTERNACIONAL DE CONDUCIR', pw / 2, 28, { align: 'center' })
    doc.setFontSize(10); doc.setFont('helvetica', 'normal')
    doc.text('License International Official (LIO)', pw / 2, 36, { align: 'center' })
    doc.text('Under the Geneva Convention on Road Traffic (1949)', pw / 2, 42, { align: 'center' })
    doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
    doc.line(20, 48, pw - 20, 48)
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
    let y = 56
    fields.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10)
      doc.text(label, 25, y); doc.setFont('helvetica', 'normal')
      doc.text(': ' + value, 85, y); y += 9
    })
    doc.setDrawColor(200); doc.setLineWidth(0.3)
    doc.line(20, y + 5, pw - 20, y + 5); y += 14
    doc.setFontSize(8); doc.setFont('helvetica', 'italic')
    doc.text(lang === 'es'
      ? 'Este documento es una traducción oficial de su licencia de conducir nacional. Debe portarse SIEMPRE junto con su licencia original. Emitido por LIO.'
      : 'This document is an official translation of your national driving license. Must ALWAYS be carried with your original license. Issued by LIO.',
      pw / 2, y, { align: 'center', maxWidth: 170 })
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7)
    doc.text('LIO - License International Official', pw / 2, 290, { align: 'center' })
    doc.save(`LIO-License-${result.id || result.id_tramite}.pdf`)
  }

  return (
    <section id="verificar" className="py-24 bg-bg-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">Verification</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-3">{t.search.title}</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted mt-4">{t.search.subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg shadow-primary/5 border border-primary-light overflow-hidden">
          <form onSubmit={handleSearch} className="flex p-2 gap-2 bg-bg-section m-2 rounded-lg border border-primary-light">
            <input
              type="text" placeholder={t.search.placeholder}
              value={docId} onChange={(e) => setDocId(e.target.value)}
              className="flex-1 px-4 py-3.5 border-0 bg-transparent outline-none text-text-main"
            />
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              <span className="hidden sm:inline">{t.search.search}</span>
            </button>
          </form>

          <AnimatePresence>
            {status === 'found' && result && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-6 md:p-8 border-t border-primary-light">
                <div className="credential-card p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-subtle rounded-full -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-subtle rounded-full -ml-8 -mb-8" />

                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary-light">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-accent font-bold text-lg">LIO</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">LICENSE INTERNATIONAL OFFICIAL</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.search.issuedBy}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{t.search.valid}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {result.fotoUrl && !imgError && (
                      <div className="shrink-0">
                        <div className="w-28 h-28 rounded-xl border-2 border-primary-light overflow-hidden bg-white shadow-sm">
                          <img
                            src={result.fotoUrl}
                            alt="Holder"
                            className="w-full h-full object-cover"
                            onError={() => setImgError(true)}
                          />
                        </div>
                        {result.fotoOriginal && (
                          <a href={result.fotoOriginal} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent text-[10px] mt-1.5 hover:underline justify-center">
                            <ExternalLink size={10} /> {t.search.viewPhoto}
                          </a>
                        )}
                      </div>
                    )}
                    {result.fotoUrl && imgError && (
                      <div className="shrink-0">
                        <div className="w-28 h-28 rounded-xl border-2 border-primary-light overflow-hidden bg-bg-section flex items-center justify-center">
                          <a href={result.fotoOriginal || result.fotoUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-accent text-[10px] hover:underline p-2 text-center">
                            <ExternalLink size={16} />
                            {t.search.viewPhoto}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-primary mb-1">{result.nombre}</h4>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3">
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.docNum}</span>
                          <p className="font-semibold text-primary text-sm">{result.id}</p>
                        </div>
                        {result.id_tramite && (
                          <div>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.idTramite}</span>
                            <p className="font-semibold text-primary text-sm">{result.id_tramite}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.nationality}</span>
                          <p className="font-semibold text-primary text-sm">{result.nacionalidad}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.dob}</span>
                          <p className="font-semibold text-primary text-sm">{result.fechaNacimiento}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.category}</span>
                          <p className="font-semibold text-primary text-sm">{result.tipo}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.validUntil}</span>
                          <p className="font-semibold text-primary text-sm">{result.validoHasta}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.status}</span>
                          <p className="font-semibold text-green-700 text-sm capitalize">{result.estado}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.height}</span>
                          <p className="font-semibold text-primary text-sm">{result.estatura}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.bloodType}</span>
                          <p className="font-semibold text-primary text-sm">{result.tipoSangre}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.eyeColor}</span>
                          <p className="font-semibold text-primary text-sm">{result.colorOjos}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {result.link && (
                    <div className="mt-4 pt-4 border-t border-primary-light">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.linkLabel}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        {isUrl(result.link) ? (
                          <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1">
                            {result.link} <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-primary font-semibold text-sm">{result.link}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {(result.fotoUrl && !imgError) && (
                    <div className="mt-4 pt-4 border-t border-primary-light">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{t.search.photoLabel}</span>
                      <a href={result.fotoOriginal || result.fotoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent font-semibold text-sm hover:underline mt-0.5">
                        <ExternalLink size={14} /> {t.search.viewPhoto}
                      </a>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-primary-light flex justify-between items-center">
                    <p className="text-[10px] text-text-muted italic">{t.search.footer}</p>
                    <button onClick={generatePDF} className="btn-outline flex items-center gap-2 text-sm py-2.5 px-5">
                      <Download size={16} /> {t.search.download}
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
        </div>
      </div>
    </section>
  )
}

export default SearchLicense
