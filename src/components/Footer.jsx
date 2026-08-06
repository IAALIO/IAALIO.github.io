import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../App'
import iaaLogo from '../assets/images/iaa-logo.png'

const Footer = () => {
  const { t } = useLang()

  return (
    <footer className="bg-primary text-white py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={iaaLogo} alt="IAA" className="h-10 w-auto" />
              <div className="leading-tight">
                <span className="text-sm font-bold text-white block">International Automobile Association</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium block">License International Official</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{t.footer.desc}</p>
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
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin size={14} className="text-accent shrink-0" /> International Business Hub
              </div>
            </div>
          </div>
        </motion.div>

        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="text-white/15 text-[6px] leading-tight mt-1 max-w-2xl mx-auto select-none">La tarjeta IAA es un producto de traducción y diseño gráfico de la licencia de conducir nacional del titular. No es un documento gubernamental, una licencia oficial de conducir, ni un Permiso Internacional de Conducir (IDP) emitido por autoridad gubernamental alguna. No reemplaza la licencia nacional original. Debe portarse siempre junto con la licencia oficial del país de origen. IAA no está afiliada a ningún gobierno, DMV, DGT ni entidad de tránsito. Las traducciones son de carácter informativo. Al adquirir este producto, el usuario acepta los Términos y Condiciones publicados en el sitio web. Prohibido su uso en países donde las traducciones privadas de licencias no estén permitidas por ley. / The IAA card is a translation and graphic design product of the holder's national driver's license. It is not a government document, official driver's license, or IDP issued by any governmental authority. Does not replace the original national license. Must always be carried together with the official license from the country of origin. IAA is not affiliated with any government, DMV, DGT or traffic authority. Translations are for informational purposes. By purchasing this product, the user accepts the Terms & Conditions published on the website. Prohibited use in countries where private license translations are not permitted by law.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
