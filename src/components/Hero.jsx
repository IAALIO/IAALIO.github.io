import { ArrowRight, ShieldCheck, Globe2, Clock, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'

const Hero = () => {
  const { t, lang } = useLang()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy min-h-screen flex items-center" style={{ paddingTop: '80px' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm text-gold-light rounded-full border border-gold/20 shadow-sm">
              <ShieldCheck size={18} />
              <span className="font-semibold tracking-wider text-xs uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              {t.hero.title}<br />
              <span className="text-gold">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-base text-gray-300 mb-10 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#tramite" className="btn-gold text-base inline-flex items-center gap-2 px-8 py-4 shadow-xl shadow-gold/20">
                {t.hero.cta} <ArrowRight size={22} />
              </a>
              <a href="#verificar" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2 backdrop-blur-sm">
                {t.hero.verify}
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Globe2, value: '150+', label: t.hero.stats.paises },
                { icon: Clock, value: '24h', label: t.hero.stats.respuesta },
                { icon: Award, value: '100%', label: t.hero.stats.legal },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                  <stat.icon size={22} className="text-gold" />
                  <div>
                    <span className="text-white font-bold text-xl">{stat.value}</span>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-6">
                  <ShieldCheck size={40} className="text-gold" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{lang === 'es' ? 'Reconocido Internacionalmente' : 'Internationally Recognized'}</h3>
                <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
                  {lang === 'es'
                    ? 'Nuestros permisos son válidos bajo los tratados internacionales de tránsito vehicular.'
                    : 'Our permits are valid under international vehicle traffic treaties.'}
                </p>
                <div className="space-y-4">
                  {[
                    lang === 'es' ? 'Convención de Ginebra 1949' : 'Geneva Convention 1949',
                    lang === 'es' ? 'Convención de Viena 1968' : 'Vienna Convention 1968',
                    lang === 'es' ? '150+ Países Adheridos' : '150+ Member Countries',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                      <span className="text-gray-300 text-sm">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-center gap-6">
                  <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">{lang === 'es' ? 'Reconocido por:' : 'Recognized by:'}</span>
                  <span className="text-gray-400 text-sm font-semibold">UN</span>
                  <span className="text-gray-400 text-sm font-semibold">FIA</span>
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
