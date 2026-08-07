import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'
import iaaLogo from '../assets/images/iaa-logo.png'

const Navbar = () => {
  const { t, toggleLang, lang } = useLang()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t.nav.inicio, href: '#' },
    { name: t.nav.comoFunciona, href: '#como-funciona' },
    { name: t.nav.precios, href: '#precios' },
    { name: t.nav.verificar, href: '#verificar' },
    { name: t.nav.faq, href: '#faq' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/85 backdrop-blur-md shadow-lg shadow-black/20 py-2 border-b border-white/10' : 'bg-primary py-3'}`}>
      <div className="absolute top-0 left-0 h-0.5 bg-accent shadow-[0_0_8px_rgba(207,46,46,0.8)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <img src={iaaLogo} alt="IAA" className="h-10 w-auto" />
          <div className="leading-tight">
            <span className="text-white text-sm font-bold block">International Automobile Association</span>
            <span className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-medium block">License International Official</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-medium text-sm text-gray-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors" aria-label="Toggle language">
            <Globe size={14} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#tramite" className="btn-primary font-semibold text-sm px-5 py-2.5">
            {t.nav.tramite}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 rounded-lg px-3 py-1.5">
            <Globe size={14} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary overflow-hidden shadow-xl"
          >
            <div className="flex flex-col items-center gap-5 py-6 px-4 border-t border-white/10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <a href="#tramite" className="btn-primary font-semibold px-8 py-3 text-sm w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.tramite}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
