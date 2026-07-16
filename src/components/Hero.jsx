import { ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'
import unLogo from '../assets/images/un-logo.svg'
import fiaLogo from '../assets/images/fia-logo.svg'

const flags = [
  { code: 'us', name: 'USA' }, { code: 'ca', name: 'Canada' },
  { code: 'mx', name: 'México' }, { code: 'br', name: 'Brasil' },
  { code: 'ar', name: 'Argentina' }, { code: 'co', name: 'Colombia' },
  { code: 'gb', name: 'UK' }, { code: 'de', name: 'Alemania' },
  { code: 'fr', name: 'Francia' }, { code: 'es', name: 'España' },
  { code: 'it', name: 'Italia' }, { code: 'nl', name: 'Países Bajos' },
]

const Hero = () => {
  const { t, lang } = useLang()

  return (
    <section className="relative overflow-hidden bg-primary min-h-screen flex items-center" style={{ paddingTop: '80px' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95" />
        <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                <ShieldCheck className="text-accent" size={24} />
              </div>
              <span className="text-accent text-xs uppercase tracking-[0.25em] font-semibold">{t.hero.badge}</span>
            </div>

            <h1 className="text-white mb-4 leading-tight font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              {t.hero.title}<br />
              <span className="text-accent">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-base text-gray-300 mb-10 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#tramite" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/25" style={{ fontSize: '0.95rem' }}>
                {t.hero.cta} <ArrowRight size={20} />
              </a>
              <a href="#verificar" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all" style={{ fontSize: '0.95rem' }}>
                {t.hero.verify}
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                <ShieldCheck size={16} className="text-accent" />
                <span className="text-white font-semibold text-sm">150+ {t.hero.stats.paises}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                <ShieldCheck size={16} className="text-accent" />
                <span className="text-white font-semibold text-sm">24h {t.hero.stats.respuesta}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                <ShieldCheck size={16} className="text-accent" />
                <span className="text-white font-semibold text-sm">100% {t.hero.stats.legal}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-white text-lg font-bold mb-1">{lang === 'es' ? 'Reconocido Internacionalmente' : 'Internationally Recognized'}</h3>
                  <div className="w-12 h-0.5 bg-accent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <img src={unLogo} alt="United Nations" className="h-12 mx-auto mb-3" />
                    <p className="text-white text-xs font-semibold">United Nations</p>
                    <p className="text-gray-400 text-[10px]">Convención Ginebra 1949</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <img src={fiaLogo} alt="FIA" className="h-12 mx-auto mb-3" />
                    <p className="text-white text-xs font-semibold">FIA</p>
                    <p className="text-gray-400 text-[10px]">Fédération Internationale</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-gray-300 text-xs text-center mb-4 uppercase tracking-wider font-semibold">
                    {lang === 'es' ? 'Países Reconocidos' : 'Recognized Countries'}
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {flags.map(f => (
                      <div key={f.code} className="flex flex-col items-center gap-1">
                        <img src={`https://flagcdn.com/24x18/${f.code}.png`} alt={f.name} className="rounded shadow-sm" loading="lazy" />
                        <span className="text-gray-400 text-[9px] font-medium">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-gray-500 text-[10px] italic">
                    {lang === 'es' ? '+150 países miembros de la Convención de Ginebra 1949 y Viena 1968' : '150+ member countries of the Geneva 1949 and Vienna 1968 Conventions'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
