import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'

const FAQ = () => {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [t.faq.q1, t.faq.q2, t.faq.q3, t.faq.q4, t.faq.q5]

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-gold-dark font-bold text-sm uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-4">{t.faq.title}</h2>
          <p className="text-gray-500">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-navy-lightest rounded-2xl overflow-hidden border border-navy-lighter">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="font-semibold text-navy pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-gold-dark shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-500 text-sm leading-relaxed border-t border-navy-lighter pt-4">
                      {faq.r}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
