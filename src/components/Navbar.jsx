import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLang } from '../App'

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-sm py-2' : 'bg-primary py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <div className={`${isScrolled ? 'bg-primary' : 'bg-accent'} w-9 h-9 rounded-lg flex items-center justify-center shadow-sm transition-colors`}>
            <span className={`font-bold text-base ${isScrolled ? 'text-accent' : 'text-primary'}`}>LIO</span>
          </div>
          <div>
            <span className={`text-base font-bold leading-none block ${isScrolled ? 'text-primary' : 'text-white'}`}>LIO</span>
            <span className={`text-[8px] uppercase tracking-[0.2em] font-medium leading-none block ${isScrolled ? 'text-text-muted' : 'text-gray-400'}`}>Oficial</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`font-medium text-sm transition-colors ${isScrolled ? 'text-text-muted hover:text-primary' : 'text-gray-300 hover:text-white'}`}>
              {link.name}
            </a>
          ))}
          <button onClick={toggleLang} className={`flex items-center gap-1.5 text-sm font-semibold transition-colors border rounded-lg px-3 py-1.5 ${isScrolled ? 'text-primary border-primary-light hover:bg-primary-light' : 'text-white border-white/30 hover:bg-white/10'}`} aria-label="Toggle language">
            <Globe size={14} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#tramite" className={`font-semibold text-sm px-5 py-2.5 rounded-lg transition-all ${isScrolled ? 'bg-primary text-white hover:bg-primary-medium' : 'bg-accent text-primary hover:bg-accent-dark'}`}>
            {t.nav.tramite}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleLang} className={`flex items-center gap-1.5 text-sm font-semibold border rounded-lg px-3 py-1.5 ${isScrolled ? 'text-primary border-primary-light' : 'text-white border-white/30'}`}>
            <Globe size={14} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isScrolled ? 'text-primary' : 'text-white'} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full py-5 flex flex-col items-center gap-5 border-t border-primary-light shadow-lg">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href="#tramite" className="bg-primary text-white font-semibold px-6 py-3 rounded-lg text-sm" onClick={() => setIsMobileMenuOpen(false)}>
            {t.nav.tramite}
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
