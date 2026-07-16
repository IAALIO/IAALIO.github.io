import { ArrowRight, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'

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
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/30">
                <span className="text-accent font-bold text-2xl">L</span>
              </div>
              <div className="h-px w-16 bg-accent/40" />
              <span className="text-accent text-xs uppercase tracking-[0.25em] font-semibold">{t.hero.badge}</span>
            </div>

            <h1 className="text-white mb-4 leading-tight font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              {t.hero.title}<br />
              <span className="text-accent">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-base text-gray-300 mb-10 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#tramite" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/25" style={{ fontSize: '0.95rem' }}>
                {t.hero.cta} <ArrowRight size={20} />
              </a>
              <a href="#verificar" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all" style={{ fontSize: '0.95rem' }}>
                {t.hero.verify}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                <ShieldCheck size={18} className="text-accent" />
                <span className="text-white font-semibold text-sm">150+ {t.hero.stats.paises}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                <ShieldCheck size={18} className="text-accent" />
                <span className="text-white font-semibold text-sm">24h {t.hero.stats.respuesta}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                <ShieldCheck size={18} className="text-accent" />
                <span className="text-white font-semibold text-sm">100% {t.hero.stats.legal}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-8 text-center">
                <div className="border-2 border-accent/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-8 mb-6">
                    <img src="/favicon.svg" alt="LIO Seal" className="h-16 w-16 opacity-80" />
                    <div>
                      <h3 className="text-white text-xl font-bold">LIO</h3>
                      <p className="text-accent text-xs uppercase tracking-wider">License International Official</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {lang === 'es'
                      ? 'Entidad oficial de trámites internacionales de conducción. Reconocida bajo los tratados internacionales de tránsito vehicular.'
                      : 'Official international driving permit entity. Recognized under international vehicle traffic treaties.'}
                  </p>
                  <div className="flex justify-center gap-8 items-center border-t border-white/10 pt-6">
                    <div className="text-center">
                      <p className="text-accent font-bold text-lg">UN</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider">United Nations</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                      <p className="text-accent font-bold text-lg">FIA</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider">Fédération Automobile</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                      <p className="text-accent font-bold text-lg">1949</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider">Ginebra</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs italic">
                  {lang === 'es' ? 'Documento válido para conducción internacional' : 'Valid document for international driving'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
