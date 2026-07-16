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
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

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
      const response = await fetch(CSV_URL)
      const csvText = await response.text()

      const lines = csvText.split('\n').filter(l => l.trim())
      const rows = lines.slice(1).map(line => parseCSVLine(line))

      const foundRow = rows.find(row =>
        (row[0] && row[0].trim() === docId.trim()) ||
        (row[1] && row[1].trim() === docId.trim())
      )

      if (foundRow) {
        setResult({
          id: foundRow[0],
          id_tramite: foundRow[1],
          nombre: foundRow[2],
          validoHasta: foundRow[3],
          estado: foundRow[4],
          tipo: foundRow[5],
          link: foundRow[6] || '',
          fechaNacimiento: foundRow[7] || '',
          nacionalidad: foundRow[8] || '',
          estatura: foundRow[9] || '',
          tipoSangre: foundRow[10] || '',
          colorOjos: foundRow[11] || '',
          fotoUrl: foundRow[12] || '',
        })
        setStatus('found')
      } else {
        setStatus('not_found')
      }
    } catch (err) {
      console.error('Error:', err)
      setStatus('not_found')
    }
  }

  const generatePDF = () => {
    if (!result) return
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('INTERNATIONAL DRIVING PERMIT', pageWidth / 2, 20, { align: 'center' })
    doc.text('PERMISO INTERNACIONAL DE CONDUCIR', pageWidth / 2, 28, { align: 'center' })

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('License International Official (LIO)', pageWidth / 2, 36, { align: 'center' })
    doc.text('Under the Geneva Convention on Road Traffic (1949)', pageWidth / 2, 42, { align: 'center' })

    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.5)
    doc.line(20, 48, pageWidth - 20, 48)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
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
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(label, 25, y)
      doc.setFont('helvetica', 'normal')
      doc.text(': ' + value, 85, y)
      y += 9
    })

    doc.setDrawColor(200)
    doc.setLineWidth(0.3)
    doc.line(20, y + 5, pageWidth - 20, y + 5)

    y += 14
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    const footerText = lang === 'es'
      ? 'Este documento es una traducción oficial de su licencia de conducir nacional. Debe portarse SIEMPRE junto con su licencia original. Emitido por LIO - License International Official.'
      : 'This document is an official translation of your national driving license. Must ALWAYS be carried with your original license. Issued by LIO - License International Official.'
    doc.text(footerText, pageWidth / 2, y, { align: 'center', maxWidth: 170 })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text('LIO - License International Official | lio.netlify.app', pageWidth / 2, 290, { align: 'center' })

    doc.save(`LIO-License-${result.id || result.id_tramite}.pdf`)
  }

  return (
    <section id="verificar" className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">{t.search.title}</h2>
          <p className="text-gray-500">{t.search.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
          <form onSubmit={handleSearch} className="flex p-1.5 gap-1.5 bg-gray-50 m-2 rounded-xl border border-gray-200">
            <input
              type="text"
              placeholder={t.search.placeholder}
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              className="flex-1 px-4 py-3.5 border-0 bg-transparent outline-none text-gray-700"
            />
            <button type="submit" className="bg-gold text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gold-dark transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              <span className="hidden sm:inline">{t.search.search}</span>
            </button>
          </form>

          <AnimatePresence>
            {status === 'found' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-6 md:p-8 border-t border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-green-100 text-green-600 p-2.5 rounded-full">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">{t.search.found}</h3>
                    <span className="text-green-600 font-semibold text-sm">{t.search.valid}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-navy-lightest to-navy-lighter rounded-2xl p-6 border border-navy-light/30 mb-6">
                  {result.fotoUrl && (
                    <div className="flex justify-center mb-5">
                      <img src={result.fotoUrl} alt="Holder photo" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                  <div className="text-center mb-5">
                    <h4 className="text-xl font-bold text-navy">{result.nombre}</h4>
                    <p className="text-xs text-gray-500">{t.search.issuedBy}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.holder}</span>
                      <p className="font-bold text-navy text-sm">{result.nombre}</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.status}</span>
                      <p className="font-bold text-green-600 text-sm capitalize">{result.estado}</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.validUntil}</span>
                      <p className="font-bold text-navy text-sm">{result.validoHasta}</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.category}</span>
                      <p className="font-bold text-navy text-sm">{result.tipo}</p>
                    </div>
                    {result.id_tramite && (
                      <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.idTramite}</span>
                        <p className="font-bold text-navy text-sm">{result.id_tramite}</p>
                      </div>
                    )}
                    {result.id && (
                      <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.docNum}</span>
                        <p className="font-bold text-navy text-sm">{result.id}</p>
                      </div>
                    )}
                    {result.estatura && (
                      <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.height}</span>
                        <p className="font-bold text-navy text-sm">{result.estatura}</p>
                      </div>
                    )}
                    {result.tipoSangre && (
                      <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.bloodType}</span>
                        <p className="font-bold text-navy text-sm">{result.tipoSangre}</p>
                      </div>
                    )}
                    {result.fechaNacimiento && (
                      <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.dob}</span>
                        <p className="font-bold text-navy text-sm">{result.fechaNacimiento}</p>
                      </div>
                    )}
                    {result.nacionalidad && (
                      <div className="bg-white/80 rounded-xl p-3 shadow-sm">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.nationality}</span>
                        <p className="font-bold text-navy text-sm">{result.nacionalidad}</p>
                      </div>
                    )}
                  </div>

                  {result.link && (
                    <div className="mt-4 bg-white/80 rounded-xl p-3 shadow-sm">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t.search.linkLabel}</span>
                      <a href={result.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gold-dark font-semibold text-sm hover:underline mt-0.5">
                        {result.link} <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>

                <button onClick={generatePDF} className="w-full py-3.5 rounded-xl font-semibold border-2 border-gold text-gold-dark hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-2">
                  <Download size={20} /> {t.search.download}
                </button>
              </motion.div>
            )}

            {status === 'not_found' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-8 border-t border-gray-100 text-center">
                <div className="inline-flex bg-red-100 text-red-600 p-3 rounded-full mb-4">
                  <XCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{t.search.notFound}</h3>
                <p className="text-sm text-gray-500">
                  {t.search.notFoundDesc} <b>{docId}</b>. {lang === 'es' ? 'Verifica el número e intenta de nuevo.' : 'Check the number and try again.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default SearchLicense
