import { motion } from 'framer-motion'
import { useLang } from '../App'
import { ArrowRight, Clock, Users } from 'lucide-react'

const StickyMobileCTA = () => {
  const { t } = useLang()

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-light shadow-2xl z-40 block md:hidden">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <span className="text-accent font-bold text-[9px]">LIO</span>
            </div>
            <div>
              <p className="font-bold text-primary text-[10px] leading-tight">{t.pricing.plans[0].price} USD</p>
              <p className="text-[8px] text-text-muted leading-tight">{t.sticky.text}</p>
            </div>
          </div>
          <a href="#tramite" className="flex items-center gap-1.5 bg-accent text-white font-bold px-5 py-2.5 rounded-lg text-xs hover:bg-accent-dark transition-all shadow-sm">
            {t.sticky.cta} <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <div className="h-[68px] block md:hidden" />
    </>
  )
}

const UrgencyTopBar = () => {
  const { t, lang } = useLang()

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="hidden md:block bg-accent text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4 py-2 text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <Users size={13} /> {lang === 'es' ? 'Más de 5,000 clientes satisfechos' : 'Over 5,000 satisfied customers'}
        </span>
        <span className="w-1 h-1 bg-white/50 rounded-full" />
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> {lang === 'es' ? 'Entrega 24-48h' : 'Delivery in 24-48h'}
        </span>
        <span className="w-1 h-1 bg-white/50 rounded-full" />
        <span className="flex items-center gap-1.5">
          <AwardIcon /> {lang === 'es' ? 'IAA · ONU · FIA' : 'IAA · UN · FIA'}
        </span>
      </div>
    </motion.div>
  )
}

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

export { StickyMobileCTA, UrgencyTopBar }
