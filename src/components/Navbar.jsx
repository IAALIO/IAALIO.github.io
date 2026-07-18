import { useState, useEffect } from 'react'
import { Menu, X, Globe, MessageCircle, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'
import iaaLogo from '../assets/images/iaa-logo.png'

const Navbar = () => {
  const { t, toggleLang, lang } = useLang()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary shadow-lg shadow-black/20 py-2' : 'bg-primary py-3'}`}>
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
          <a href="https://wa.me/584244296940" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="WhatsApp">
            <MessageCircle size={16} />
          </a>
          <a href="mailto:license.international.official@gmail.com" className="text-white/40 hover:text-white transition-colors" aria-label="Email">
            <Mail size={16} />
          </a>
          <a href="#tramite" className="font-semibold text-sm px-5 py-2.5 rounded-lg bg-accent text-white hover:bg-accent-dark transition-all shadow-sm">
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
              <div className="flex items-center gap-4 pt-2">
                <a href="https://wa.me/584244296940" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="WhatsApp">
                  <MessageCircle size={18} />
                </a>
                <a href="mailto:license.international.official@gmail.com" className="text-white/50 hover:text-white transition-colors" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
              <a href="#tramite" className="bg-accent text-white font-semibold px-8 py-3 rounded-lg text-sm shadow-sm w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
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
