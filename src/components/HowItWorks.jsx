import { FileText, CreditCard, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'

const HowItWorks = () => {
  const { t } = useLang()
  const icons = [FileText, CreditCard, Truck]

  return (
    <section id="como-funciona" className="py-24 bg-navy-lightest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold-dark font-bold text-sm uppercase tracking-[0.2em]">Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-4">{t.how.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.how.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((step) => {
            const Icon = icons[step - 1]
            const key = `step${step}`
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: step * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-navy/20">
                    <Icon className="text-gold" size={28} />
                  </div>
                  <div className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold -mt-3">
                    {step}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{t.how[key].title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.how[key].desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
