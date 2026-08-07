import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'

const FAQ = () => {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = [t.faq.q1, t.faq.q2, t.faq.q3, t.faq.q4, t.faq.q5, t.faq.q6, t.faq.q7, t.faq.q8]

  return (
    <section id="faq" className="py-16 sm:py-24 bg-bg-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">{t.faq.title}</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted mt-4">{t.faq.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-primary-light overflow-hidden card-hover"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
              >
                <span className="font-semibold text-primary text-sm pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-accent shrink-0 transition-all duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-text-muted text-sm leading-relaxed border-t border-primary-light pt-4">
                      {faq.r}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <p className="text-text-muted text-sm mb-4">{t.faq.subtitle}</p>
          <a href="#tramite" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold shadow-lg shadow-accent/20">
            {t.hero.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
