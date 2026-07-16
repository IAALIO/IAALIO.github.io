import { useState } from 'react'
import { User, FileText, Camera, Send, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../App'

const ApplicationForm = () => {
  const { t } = useLang()
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState({
    nombreCompleto: '', paisNacimiento: '', paisResidencia: '', estatura: '',
    tipoSangre: '', colorOjos: '', email: '', telefono: '', fechaNacimiento: '', vigencia: '1 year',
  })

  const [capturedFiles, setCapturedFiles] = useState({
    fotoCarnet: null, fotoFirma: null, fotoID: null, fotoLicencia: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) setCapturedFiles(prev => ({ ...prev, [name]: files[0] }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const validateStep = () => {
    if (step === 1) return formData.nombreCompleto?.trim() && formData.paisNacimiento?.trim() && formData.fechaNacimiento && formData.paisResidencia?.trim()
    if (step === 2) return formData.estatura?.trim() && formData.tipoSangre && formData.colorOjos?.trim()
    if (step === 3) return capturedFiles.fotoCarnet && capturedFiles.fotoFirma && capturedFiles.fotoID && capturedFiles.fotoLicencia
    if (step === 4) return formData.email?.trim() && formData.telefono?.trim()
    return true
  }

  const handleNext = () => { if (validateStep()) nextStep(); else alert(t.form.alertStep) }

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!validateStep()) { alert(t.form.alertEmail); return }
    const btn = document.getElementById('submit-btn')
    if (btn) { btn.disabled = true; btn.innerText = t.form.sending }
    const fd = new FormData()
    fd.append('form-name', 'tramite-licencia'); fd.append('bot-field', '')
    Object.keys(formData).forEach(key => fd.append(key, formData[key]))
    Object.keys(capturedFiles).forEach(key => { if (capturedFiles[key]) fd.append(key, capturedFiles[key]) })
    fetch("/", { method: "POST", body: fd })
      .then(r => { if (r.ok) window.location.href = "/success.html"; else throw new Error() })
      .catch(() => { alert("Error"); if (btn) { btn.disabled = false; btn.innerText = t.form.submit } })
  }

  return (
    <section id="tramite" className="py-24 bg-bg-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-accent-dark font-bold text-sm uppercase tracking-[0.2em]">Application</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-3">{t.form.title}</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-text-muted mt-4">{t.form.subtitle}</p>
        </div>

        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step === i ? 'bg-accent text-primary shadow-sm' :
                step > i ? 'bg-primary text-white' : 'bg-primary-light text-text-muted'
              }`}>
                {i}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-1.5 hidden md:block">{t.form.steps[i-1]}</span>
            </div>
          ))}
          <div className="absolute top-4 left-0 w-full h-0.5 bg-primary-light -z-0">
            <div className="h-full bg-accent transition-all duration-500 rounded-full" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg shadow-primary/5 border border-primary-light p-6 md:p-8">
          <form name="tramite-licencia">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                    <User className="text-accent" size={20} /> {t.form.step1.title}
                  </h3>
                  <div className="space-y-4">
                    <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} placeholder={t.form.step1.nombrePlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" name="paisNacimiento" value={formData.paisNacimiento} onChange={handleChange} placeholder={t.form.step1.paisNacPlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                      <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                    </div>
                    <input type="text" name="paisResidencia" value={formData.paisResidencia} onChange={handleChange} placeholder={t.form.step1.paisResPlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                    <select name="vigencia" value={formData.vigencia} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm">
                      <option value="1 year">1 Año - $70 USD</option>
                      <option value="2 years">2 Años - $100 USD</option>
                      <option value="5 years">5 Años - $150 USD</option>
                    </select>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                    <FileText className="text-accent" size={20} /> {t.form.step2.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <input type="text" name="estatura" value={formData.estatura} onChange={handleChange} placeholder={t.form.step2.estaturaPlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                    <select name="tipoSangre" value={formData.tipoSangre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required>
                      <option value="">--</option>
                      {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input type="text" name="colorOjos" value={formData.colorOjos} onChange={handleChange} placeholder={t.form.step2.ojosPlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                    <Camera className="text-accent" size={20} /> {t.form.step3.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-5">{t.form.step3.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['fotoCarnet', 'fotoFirma', 'fotoID', 'fotoLicencia'].map((field) => {
                      const labels = { fotoCarnet: t.form.step3.carnet, fotoFirma: t.form.step3.firma, fotoID: t.form.step3.idDoc, fotoLicencia: t.form.step3.licencia }
                      return (
                        <div key={field}>
                          <label className="block text-sm font-medium text-primary mb-1">{labels[field]}</label>
                          <input type="file" name={field} accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2.5 rounded-lg border border-primary-light file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-accent file:font-medium file:text-xs hover:file:bg-primary-medium cursor-pointer text-sm" required />
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                    <Send className="text-accent" size={20} /> {t.form.step4.title}
                  </h3>
                  <div className="space-y-4">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.form.step4.emailPlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder={t.form.step4.telefonoPlaceholder} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm" required />
                    <div className="bg-bg-section p-4 rounded-lg">
                      <p className="text-xs text-text-muted leading-relaxed">{t.form.step4.terms}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6 pt-5 border-t border-primary-light">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all text-sm">
                  <ChevronLeft size={18} /> {t.form.prev}
                </button>
              ) : <div />}
              {step < totalSteps ? (
                <button type="button" onClick={handleNext} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all text-sm shadow-sm">
                  {t.form.next} <ChevronRight size={18} />
                </button>
              ) : (
                <button type="button" id="submit-btn" onClick={handleSubmit} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-medium transition-all text-sm">
                  {t.form.submit} <Send size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ApplicationForm
