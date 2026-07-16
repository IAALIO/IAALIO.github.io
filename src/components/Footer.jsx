import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useLang } from '../App'

const Footer = () => {
  const { t } = useLang()

  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <span className="text-navy font-bold text-lg">L</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white leading-none block">LIO</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-medium leading-none block">International</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{t.footer.desc}</p>
            <div className="flex gap-4">
              <a href="mailto:license.internationa.official@gmail.com" className="text-gray-400 hover:text-gold transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="tel:+584244296940" className="text-gray-400 hover:text-gold transition-colors" aria-label="Phone">
                <Phone size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors" aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-gold text-sm uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.inicio}</a>
              <a href="#como-funciona" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.comoFunciona}</a>
              <a href="#precios" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.precios}</a>
              <a href="#verificar" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.verificar}</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-gold text-sm uppercase tracking-wider">{t.footer.support}</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">{t.footer.faq}</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t.footer.terms}</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t.footer.privacy}</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-gold text-sm uppercase tracking-wider">{t.footer.contact}</h4>
            <div className="flex flex-col gap-3.5">
              <a href="mailto:license.internationa.official@gmail.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={16} className="text-gold shrink-0" />
                <span>license.internationa.official@gmail.com</span>
              </a>
              <a href="tel:+584244296940" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+58 4244296940</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-gold shrink-0" />
                <span>International Business Hub</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
