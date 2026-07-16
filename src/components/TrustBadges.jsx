import { CreditCard, Lock, Phone, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'

const TrustBadges = () => {
  const { t } = useLang()

  return (
    <section className="py-16 sm:py-24 bg-bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-[0.2em]">Authority</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">
            {t.trust.title} <span className="text-accent">{t.trust.titleAccent}</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted max-w-xl mx-auto mt-4">{t.trust.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3 mb-12">
          {[t.trust.badge1, t.trust.badge2, t.trust.badge3, t.trust.badge4].map((b, i) => (
            <div key={i} className="bg-white border border-primary-light rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
              <Award size={14} className="text-accent" />
              <span className="text-primary font-semibold text-xs">{b}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-primary-light text-center card-hover"
          >
            <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard size={24} className="text-accent" />
            </div>
            <h3 className="font-bold text-primary text-sm mb-2">{t.trust.paymentTitle}</h3>
            <p className="text-xs text-text-muted leading-relaxed mb-3">{t.trust.paymentDesc}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Binance', 'PayPal', 'Zelle', 'Bancos Internacionales', 'Bancos Locales'].map((m, i) => (
                <span key={i} className="bg-accent-subtle text-accent font-semibold px-2.5 py-1 rounded text-[10px] tracking-wide">{m}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-primary-light text-center card-hover"
          >
            <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-accent" />
            </div>
            <h3 className="font-bold text-primary text-sm mb-2">{t.trust.securityTitle}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{t.trust.securityDesc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-primary-light text-center card-hover"
          >
            <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone size={24} className="text-accent" />
            </div>
            <h3 className="font-bold text-primary text-sm mb-2">{t.trust.phoneTitle}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{t.trust.phoneDesc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
