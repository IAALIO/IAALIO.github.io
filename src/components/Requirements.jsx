import { FileText, ShieldCheck } from 'lucide-react'
import { useLang } from '../App'
import { icons } from 'lucide-react'

const IconRenderer = ({ name, size = 24 }) => {
  const LucideIcon = icons[name]
  if (!LucideIcon) return null
  return <LucideIcon size={size} className="text-gold shrink-0" />
}

const Requirements = () => {
  const { t } = useLang()

  return (
    <section id="requisitos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold-dark font-bold text-sm uppercase tracking-[0.2em]">Requirements</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-4">
            {t.requirements.title}<span className="text-gold-dark">{t.requirements.titleAccent}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.requirements.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.requirements.items.map((req, index) => (
              <div key={index} className="flex gap-4 p-5 rounded-2xl bg-navy-lightest border border-navy-lighter hover:shadow-md transition-all">
                <div className="p-3 bg-navy rounded-xl shrink-0">
                  <IconRenderer name={req.icon} />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">{req.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex p-4 bg-gold text-white rounded-2xl mb-6 shadow-lg shadow-gold/30">
                  <FileText size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.requirements.sidebar.title}</h3>
                <p className="text-sm text-gray-300 mb-8">{t.requirements.sidebar.desc}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <ShieldCheck size={18} className="text-gold" />
                    <span className="text-sm font-medium text-white">{t.requirements.sidebar.feature1}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <ShieldCheck size={18} className="text-gold" />
                    <span className="text-sm font-medium text-white">{t.requirements.sidebar.feature2}</span>
                  </div>
                </div>
                <a href="#tramite" className="block w-full bg-gold text-white py-3.5 rounded-xl font-semibold hover:bg-gold-dark transition-all text-center shadow-lg shadow-gold/20">
                  {t.requirements.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Requirements
