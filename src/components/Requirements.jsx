import { FileText, ShieldCheck } from 'lucide-react'
import { useLang } from '../App'
import { icons } from 'lucide-react'

const IconRenderer = ({ name, size = 24 }) => {
  const LucideIcon = icons[name]
  if (!LucideIcon) return null
  return <LucideIcon size={size} className="text-primary shrink-0" />
}

const Requirements = () => {
  const { t } = useLang()

  return (
    <section id="requisitos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent-dark font-bold text-sm uppercase tracking-[0.2em]">Requirements</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-4">
            {t.requirements.title}<span className="text-accent-dark">{t.requirements.titleAccent}</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted max-w-xl mx-auto mt-4">{t.requirements.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.requirements.items.map((req, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg border border-primary-light bg-bg-section hover:shadow-sm transition-all">
                <div className="p-2.5 bg-primary rounded-lg shrink-0">
                  <IconRenderer name={req.icon} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-0.5">{req.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-primary rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="inline-flex p-3 bg-accent text-primary rounded-xl mb-5 shadow-sm">
                  <FileText size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.requirements.sidebar.title}</h3>
                <p className="text-sm text-gray-300 mb-6">{t.requirements.sidebar.desc}</p>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <ShieldCheck size={16} className="text-accent" />
                    <span className="text-sm font-medium text-white">{t.requirements.sidebar.feature1}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <ShieldCheck size={16} className="text-accent" />
                    <span className="text-sm font-medium text-white">{t.requirements.sidebar.feature2}</span>
                  </div>
                </div>
                <a href="#tramite" className="block w-full bg-accent text-primary font-bold py-3 rounded-lg text-sm hover:bg-accent-dark transition-all shadow-sm">
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
