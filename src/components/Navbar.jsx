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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-md py-2.5' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-gold font-bold text-base">L</span>
          </div>
          <div>
            <span className="text-xl font-bold text-navy leading-none block">LIO</span>
            <span className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-medium leading-none block">International</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-medium text-gray-600 hover:text-navy transition-colors text-sm">
              {link.name}
            </a>
          ))}
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold-dark transition-colors border border-gray-200 rounded-xl px-3 py-2" aria-label="Toggle language">
            <Globe size={15} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#tramite" className="btn-gold text-sm shadow-md">
            {t.nav.tramite}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-semibold text-navy border border-gray-200 rounded-xl px-3 py-2" aria-label="Toggle language">
            <Globe size={15} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-navy p-2" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full py-5 flex flex-col items-center gap-5 border-t border-gray-100 animate-fadeIn">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-navy" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href="#tramite" className="btn-gold text-sm" onClick={() => setIsMobileMenuOpen(false)}>
            {t.nav.tramite}
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
