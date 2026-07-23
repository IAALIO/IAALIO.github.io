import { useState } from 'react'
import { Search, Loader2, CheckCircle2, XCircle, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'
import { jsPDF, GState } from 'jspdf'
import iaaLogo from '../assets/images/iaa-logo.png'
import unLogo from '../assets/images/un-logo.png'
import fiaLogo from '../assets/images/fia-logo.png'

const FORM_API = import.meta.env.VITE_FORM_API || ''

function getDirectImageUrl(url) {
  if (!url) return ''
  const m = url.match(/\/file\/d\/([^/]+)/)
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}=w400`
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

  const fetchLicenciasJSONP = () => {
    return new Promise((resolve, reject) => {
      const apiUrl = FORM_API
      if (!apiUrl) return reject(new Error('no api'))
      const cb = 'jcb_' + Date.now()
      const s = document.createElement('script')
      s.src = apiUrl + '?action=licencias&callback=' + cb
      window[cb] = (data) => { delete window[cb]; document.body.removeChild(s); resolve(data) }
      s.onerror = () => { delete window[cb]; document.body.removeChild(s); reject(new Error('jsonp')) }
      document.body.appendChild(s)
      setTimeout(() => { if (window[cb]) { delete window[cb]; document.body.removeChild(s); reject(new Error('timeout')) } }, 8000)
    })
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!docId) return
    setStatus('loading')
    try {
      let result
      try {
        result = await fetchLicenciasJSONP()
      } catch {
        const r = await fetch('./data/licencias.json')
        result = await r.json()
      }
      if (!result.ok || !result.data) { setStatus('not_found'); return }
      const q = docId.trim()
      const found = result.data.find(r =>
        String(r.documento) === q ||
        String(r.id_tramite) === q
      )
      if (found) {
        setResult({
          id: found.documento || '',
          id_tramite: found.id_tramite || '',
          nombre: found.nombre || '',
          validoHasta: found.vencimiento || '',
          estado: found.estado || '',
          tipo: found.categoria || '',
          link: getDirectImageUrl(found.licencia || ''),
          linkOriginal: getGDriveFileUrl(found.licencia || ''),
          fechaNacimiento: found.fecha_nacimiento || '',
          nacionalidad: found.nacionalidad || '',
          estatura: found.estatura || '',
          tipoSangre: found.tipo_sangre || '',
          colorOjos: found.color_ojos || '',
          fotoUrl: getDirectImageUrl(found.foto_url || ''),
          fotoOriginal: getGDriveFileUrl(found.foto_url || ''),
          paisValido: found.pais_valido || '',
          firmaUrl: getDirectImageUrl(found.firma || ''),
          firmaOriginal: getGDriveFileUrl(found.firma || ''),
          cedulaUrl: getDirectImageUrl(found.cedula || ''),
          cedulaOriginal: getGDriveFileUrl(found.cedula || ''),
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

      const loadImgDataUrl = async (src) => {
        if (!src) return null
        try {
          const resp = await fetch(src)
          if (!resp.ok) return null
          if (src.endsWith('.svg') || resp.headers.get('content-type')?.includes('svg')) {
            const text = await resp.text()
            const b64 = btoa(text)
            const img = new Image()
            img.src = 'data:image/svg+xml;base64,' + b64
            await img.decode()
            const c = document.createElement('canvas')
            c.width = img.width || 200; c.height = img.height || 60
            const ctx = c.getContext('2d')
            ctx.drawImage(img, 0, 0)
            return c.toDataURL('image/png')
          } else {
            const blob = await resp.blob()
            return new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob) })
          }
        } catch { return null }
      }

      const [iaaUrl, unUrl, fiaUrl] = await Promise.all([
        loadImgDataUrl(iaaLogo), loadImgDataUrl(unLogo), loadImgDataUrl(fiaLogo),
      ])

      if (iaaUrl) {
        try {
          doc.setGState(new GState({ opacity: 0.15 }))
          doc.addImage(iaaUrl, 'PNG', (pw - 120) / 2, (ph - 70) / 2, 120, 70)
          doc.setGState(new GState({ opacity: 1 }))
        } catch {}
      }

      const es = lang === 'es'
      const endorseText = es ? 'Avalado por IAA · ONU · FIA' : 'Endorsed by IAA · UN · FIA'

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14); doc.text('INTERNATIONAL DRIVING PERMIT', pw / 2, 14, { align: 'center' })
      doc.text('PERMISO INTERNACIONAL DE CONDUCIR', pw / 2, 20, { align: 'center' })
      doc.setFontSize(8); doc.setFont('helvetica', 'normal')
      doc.text('IAA - License International Official', pw / 2, 26, { align: 'center' })
      doc.setFontSize(7); doc.setFont('helvetica', 'bold')
      doc.text(endorseText, pw / 2, 31, { align: 'center' })
      doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
      doc.line(20, 34, pw - 20, 34)

      const leftX = 20
      const labelX = 72
      let y = 39
      const lineH = 6

      doc.setFontSize(8)
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
      fields.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold')
        doc.text(label, leftX, y)
        doc.setFont('helvetica', 'normal')
        doc.text(': ' + value, labelX, y)
        y += lineH
      })

      const fotoY = 39
      if (result.fotoUrl) {
        try {
          const resp = await fetch(result.fotoUrl, { mode: 'cors' })
          const blob = await resp.blob()
          const b64 = await new Promise(resolve => {
            const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob)
          })
          const ext = blob.type === 'image/jpeg' ? 'JPEG' : 'PNG'
          const fotoW = 35; const fotoH = 42
          doc.addImage(b64, ext, 150, fotoY, fotoW, fotoH)
          doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.5)
          doc.rect(150, fotoY, fotoW, fotoH)
        } catch {}
      }

      y = Math.max(y, fotoY + 42 + 4) + 1

      if (result.link || result.cedulaUrl) {
        doc.setDrawColor(200); doc.setLineWidth(0.3)
        doc.line(20, y, pw - 20, y); y += 5
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8)
        doc.text(es ? 'DOCUMENTOS ADJUNTOS' : 'ATTACHED DOCUMENTS', pw / 2, y, { align: 'center' }); y += 4

        const thumbW = 48; const thumbH = 32; const thumbGap = 8
        const docs = [
          result.link,
          result.cedulaUrl,
        ].filter(Boolean)
        const totalDocsW = docs.length * thumbW + (docs.length - 1) * thumbGap
        let dx = (pw - totalDocsW) / 2

        for (const url of docs) {
          try {
            const resp = await fetch(url, { mode: 'cors' })
            const blob = await resp.blob()
            const b64 = await new Promise(resolve => {
              const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob)
            })
            const ext = blob.type === 'image/jpeg' ? 'JPEG' : 'PNG'
            doc.addImage(b64, ext, dx, y, thumbW, thumbH)
            doc.setDrawColor(200); doc.setLineWidth(0.3)
            doc.rect(dx, y, thumbW, thumbH)
          } catch {}
          dx += thumbW + thumbGap
        }
        y += thumbH + 8
      }

      if (result.firmaUrl) {
        y += 1
        const sigW = 50; const sigH = 18
        try {
          const resp = await fetch(result.firmaUrl, { mode: 'cors' })
          const blob = await resp.blob()
          const b64 = await new Promise(resolve => {
            const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob)
          })
          const ext = blob.type === 'image/jpeg' ? 'JPEG' : 'PNG'
          const sigX = (pw - sigW) / 2
          doc.addImage(b64, ext, sigX, y, sigW, sigH)
          doc.setFont('helvetica', 'italic'); doc.setFontSize(6)
          doc.text(es ? 'Firma del titular / Holder\'s signature' : 'Holder\'s signature / Firma del titular', pw / 2, y + sigH + 3, { align: 'center' })
          y += sigH + 7
          if (result.nombre || result.id) {
            doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5)
            const nameLine = result.nombre || ''
            const idLine = result.id ? `N° ${result.id}` : ''
            doc.text(nameLine, pw / 2, y, { align: 'center' })
            if (idLine) doc.text(idLine, pw / 2, y + 3.5, { align: 'center' })
            y += 8
          }
        } catch {}
      }

      doc.setDrawColor(200); doc.setLineWidth(0.3)
      doc.line(20, y, pw - 20, y); y += 6

      const legalClauses = es ? [
        'BASE LEGAL',
        'Este Permiso Internacional de Conducir es emitido por IAA (International Automobile Association)',
        'bajo los siguientes fundamentos legales:',
        '',
        '• Convención de Ginebra sobre Circulación Vial (1949)',
        '• Convención de Viena sobre Circulación Vial (1968)',
        '• Resolución de la Asamblea General de la ONU sobre estandarización de documentos de tránsito',
        '• Reglamento FIA para Permisos Internacionales de Conducir',
        '',
        'Válido en más de 160 países miembros de las Naciones Unidas y signatarios de los convenios.',
        'Debe portarse siempre junto con la licencia de conducir original del titular.',
      ] : [
        'LEGAL BASIS',
        'This International Driving Permit is issued by IAA (International Automobile Association)',
        'under the following legal foundations:',
        '',
        '• Geneva Convention on Road Traffic (1949)',
        '• Vienna Convention on Road Traffic (1968)',
        '• UN General Assembly Resolution on traffic document standardization',
        '• FIA Regulations for International Driving Permits',
        '',
        'Valid in over 160 UN member states and signatory countries.',
        'Must be carried together with the original national driving license.',
      ]
      doc.setFont('helvetica', 'bold'); doc.setFontSize(7)
      legalClauses.forEach(line => {
        if (line === 'BASE LEGAL' || line === 'LEGAL BASIS') {
          doc.setFont('helvetica', 'bold'); doc.setFontSize(8)
          doc.text(line, pw / 2, y, { align: 'center' }); y += 4
          doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5)
        } else if (line === '') {
          y += 1.5
        } else {
          doc.text(line, 25, y, { maxWidth: 160 }); y += 3.5
        }
      })

      y += 3
      doc.setDrawColor(200); doc.setLineWidth(0.3)
      doc.line(20, y, pw - 20, y); y += 5

      const logos = [iaaUrl, unUrl, fiaUrl].filter(Boolean)
      const logoSize = 14
      const totalW = logos.length * logoSize + (logos.length - 1) * 6
      let lx = (pw - totalW) / 2
      logos.forEach(url => {
        try { doc.addImage(url, 'PNG', lx, y, logoSize, logoSize) } catch {}
        lx += logoSize + 6
      })
      y += logoSize + 7

      doc.setFont('helvetica', 'italic'); doc.setFontSize(6)
      doc.text(es
        ? 'Documento oficial emitido por IAA - License International Official.'
        : 'Official document issued by IAA - License International Official.',
        pw / 2, y, { align: 'center' })
      doc.setFont('helvetica', 'normal'); doc.setFontSize(5.5)
      doc.text(`IAA — ${endorseText}`, pw / 2, y + 3.5, { align: 'center' })
      y += 5
      doc.setTextColor(100, 100, 100)
      doc.setFont('helvetica', 'normal'); doc.setFontSize(3.2)
      const discText = es
        ? 'La tarjeta IAA es un producto de traducción y diseño gráfico de la licencia de conducir nacional del titular. No es un documento gubernamental, una licencia oficial de conducir, ni un Permiso Internacional de Conducir (IDP) emitido por autoridad gubernamental alguna. No reemplaza la licencia nacional original. Debe portarse siempre junto con la licencia oficial del país de origen. IAA no está afiliada a ningún gobierno, DMV, DGT ni entidad de tránsito. Las traducciones son de carácter informativo. Al adquirir este producto, el usuario acepta los Términos y Condiciones publicados en el sitio web.'
        : 'The IAA card is a translation and graphic design product of the holder\'s national driver\'s license. It is not a government document, official driver\'s license, or IDP issued by any governmental authority. Does not replace the original national license. Must always be carried together with the official license from the country of origin. IAA is not affiliated with any government, DMV, DGT or traffic authority. Translations are for informational purposes. By purchasing this product, the user accepts the Terms & Conditions published on the website.'
      doc.text(discText, pw / 2, y, { align: 'center', maxWidth: 170 })
      doc.setTextColor(0, 0, 0)

      const pdfUrl = doc.output('bloburl')
      window.open(pdfUrl, '_blank')
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
                        <div className="w-36 h-44 rounded-xl border-2 border-primary-light overflow-hidden bg-white shadow-sm">
                          <img src={result.fotoUrl} alt="Holder" className="w-full h-full object-contain bg-gray-50" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<a href=\"${result.fotoOriginal || result.fotoUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"w-full h-full flex items-center justify-center text-accent text-[10px] font-semibold hover:underline\">${lang === 'es' ? 'Ver Foto' : 'View Photo'}</a>` }} />
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

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-primary-light justify-center">
                    {result.link && (
                      <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                        <div className="mt-1 w-full h-28 rounded-lg border border-primary-light overflow-hidden bg-gray-50">
                          <img src={result.link} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<a href=\"${result.linkOriginal || result.link}\" target=\"_blank\" class=\"w-full h-full flex items-center justify-center text-accent text-[10px] font-semibold hover:underline\">${lang === 'es' ? 'Ver' : 'View'}</a>` }} />
                        </div>
                      </div>
                    )}
                    {result.cedulaUrl && (
                      <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                        <div className="mt-1 w-full h-28 rounded-lg border border-primary-light overflow-hidden bg-gray-50">
                          <img src={result.cedulaUrl} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<a href=\"${result.cedulaOriginal || result.cedulaUrl}\" target=\"_blank\" class=\"w-full h-full flex items-center justify-center text-accent text-[10px] font-semibold hover:underline\">${lang === 'es' ? 'Ver' : 'View'}</a>` }} />
                        </div>
                      </div>
                    )}
                  </div>

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
