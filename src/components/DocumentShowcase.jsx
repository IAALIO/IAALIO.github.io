import { motion } from 'framer-motion'
import { useLang } from '../App'
import { QrCode, Globe, Shield } from 'lucide-react'
import licenciaFrente from '../assets/images/licencia-frente.png'
import licenciaDorso from '../assets/images/licencia-dorso.png'
import folletoTraduccion from '../assets/images/folleto-traduccion.png'
import packageCompleto from '../assets/images/package-completo.png'

const DocumentShowcase = () => {
  const { t, lang } = useLang()

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">Document</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">
            {lang === 'es' ? 'Tu Permiso' : 'Your Permit'}{' '}
            <span className="text-accent">{lang === 'es' ? 'Internacional' : 'Document'}</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted max-w-xl mx-auto mt-4">
            {lang === 'es'
              ? 'Recibirás un carnet físico con código QR y un folleto de traducción en 9 idiomas.'
              : 'You receive a physical card with QR code and a translation booklet in 9 languages.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="bg-bg-section rounded-2xl p-4 border border-primary-light shadow-sm">
              <img src={licenciaFrente} alt="Licencia internacional frente" className="w-full rounded-xl" loading="lazy" />
              <p className="text-center text-xs text-text-muted mt-2 font-medium">{lang === 'es' ? 'Carnet de Identificación Físico' : 'Physical Identification Card'}</p>
            </div>
            <div className="bg-bg-section rounded-2xl p-4 border border-primary-light shadow-sm">
              <img src={licenciaDorso} alt="Licencia internacional dorso" className="w-full rounded-xl" loading="lazy" />
              <p className="text-center text-xs text-text-muted mt-2 font-medium">{lang === 'es' ? 'Dorso del carnet con código QR' : 'Card back with QR code'}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="bg-bg-section rounded-2xl p-4 border border-primary-light shadow-sm">
              <img src={folletoTraduccion} alt="Folleto de traducción 9 idiomas" className="w-full rounded-xl" loading="lazy" />
              <p className="text-center text-xs text-text-muted mt-2 font-medium">{lang === 'es' ? 'Folleto de Traducción en 9 Idiomas' : 'Translation Booklet in 9 Languages'}</p>
            </div>
            <div className="bg-bg-section rounded-2xl p-4 border border-primary-light shadow-sm">
              <img src={packageCompleto} alt="Paquete completo" className="w-full rounded-xl" loading="lazy" />
              <p className="text-center text-xs text-text-muted mt-2 font-medium">{lang === 'es' ? 'Paquete Completo' : 'Complete Package'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Globe, title: lang === 'es' ? '9 Idiomas' : '9 Languages', desc: lang === 'es' ? 'Traducción oficial multilingüe' : 'Official multilingual translation' },
                { icon: QrCode, title: lang === 'es' ? 'QR' : 'QR Code', desc: lang === 'es' ? 'Verificación electrónica' : 'Electronic verification' },
                { icon: Shield, title: lang === 'es' ? 'Respaldo' : 'Backing', desc: lang === 'es' ? 'Convenio de Ginebra 1949' : 'Geneva Convention 1949' },
              ].map((item, i) => (
                <div key={i} className="bg-accent-subtle rounded-xl p-3 text-center border border-accent-light">
                  <item.icon size={18} className="text-accent mx-auto mb-1" />
                  <p className="font-bold text-primary text-[11px]">{item.title}</p>
                  <p className="text-text-muted text-[9px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <a href="#tramite" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-8 py-3.5 rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 text-sm">
            {lang === 'es' ? 'Solicitar Ahora' : 'Apply Now'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default DocumentShowcase
