import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'

const Testimonials = () => {
  const { t } = useLang()

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">
            {t.testimonials.title} <span className="text-accent">{t.testimonials.titleAccent}</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted max-w-xl mx-auto mt-4">{t.testimonials.subtitle}</p>
        </motion.div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-4 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
          {t.testimonials.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-bg-section rounded-xl p-5 border border-primary-light card-hover min-w-[85vw] sm:min-w-0 snap-start"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-accent" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4 italic">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-primary-light">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-[11px] font-bold text-accent shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">{item.name}</p>
                  <p className="text-[10px] text-text-muted">{item.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <a href="#tramite" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold shadow-lg shadow-accent/20">
            {t.hero.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
