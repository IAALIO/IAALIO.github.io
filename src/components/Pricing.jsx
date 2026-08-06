import { Check, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'

const Pricing = () => {
  const { t } = useLang()

  return (
    <section id="precios" className="py-16 sm:py-24 bg-bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">{t.pricing.title}</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted max-w-xl mx-auto mt-4">{t.pricing.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto items-start">
          {t.pricing.plans.map((plan, index) => {
            const isPopular = index === 1
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-xl overflow-hidden flex flex-col relative ${isPopular ? 'ring-2 ring-accent shadow-xl shadow-accent/10 md:scale-105 z-10' : 'border border-primary-light shadow-md card-hover'}`}
              >
                {isPopular && (
                  <div className="bg-accent text-white text-center py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <Star size={14} fill="currentColor" /> {t.pricing.recommended}
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">{plan.title}</h3>
                  <div className="mb-3">
                    <a href="#tramite" className="inline-block text-sm font-bold text-accent underline underline-offset-4 hover:text-accent-dark transition-colors">
                      {t.pricing.consultPrice}
                    </a>
                  </div>
                  <p className="text-sm text-text-muted mb-5">{plan.desc}</p>
                  <div className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2.5">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-text-muted">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#tramite" className={`block text-center py-3 rounded-lg font-semibold text-sm transition-all ${
                    isPopular ? 'bg-accent text-white hover:bg-accent-dark shadow-sm' : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}>
                    {t.pricing.select}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing
