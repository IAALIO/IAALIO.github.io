import { Mail, Phone, MapPin } from 'lucide-react'
import { useLang } from '../App'

const Footer = () => {
  const { t } = useLang()

  return (
    <footer className="bg-primary text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">LIO</span>
              </div>
              <div>
                <span className="text-base font-bold text-white leading-none block">LIO</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-[0.2em] font-medium leading-none block">License International Official</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{t.footer.desc}</p>
            <div className="flex gap-3">
              <a href="mailto:license.internationa.official@gmail.com" className="text-gray-400 hover:text-accent transition-colors"><Mail size={18} /></a>
              <a href="tel:+584244296940" className="text-gray-400 hover:text-accent transition-colors"><Phone size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-accent text-xs uppercase tracking-wider mb-4">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.inicio}</a>
              <a href="#como-funciona" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.comoFunciona}</a>
              <a href="#precios" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.precios}</a>
              <a href="#verificar" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.verificar}</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-accent text-xs uppercase tracking-wider mb-4">{t.footer.support}</h4>
            <div className="flex flex-col gap-2">
              <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">{t.footer.faq}</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t.footer.terms}</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t.footer.privacy}</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-accent text-xs uppercase tracking-wider mb-4">{t.footer.contact}</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:license.internationa.official@gmail.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={14} className="text-accent shrink-0" /> license.internationa.official@gmail.com
              </a>
              <a href="tel:+584244296940" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={14} className="text-accent shrink-0" /> +58 4244296940
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin size={14} className="text-accent shrink-0" /> International Business Hub
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
