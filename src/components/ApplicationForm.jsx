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
    if (files && files[0]) {
      setCapturedFiles(prev => ({ ...prev, [name]: files[0] }))
    }
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

  const handleNext = () => {
    if (validateStep()) nextStep()
    else alert(t.form.alertStep)
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!validateStep()) { alert(t.form.alertEmail); return }

    const btn = document.getElementById('submit-btn')
    if (btn) { btn.disabled = true; btn.innerText = t.form.sending }

    const formDataObj = new FormData()
    formDataObj.append('form-name', 'tramite-licencia')
    formDataObj.append('bot-field', '')
    Object.keys(formData).forEach(key => formDataObj.append(key, formData[key]))
    Object.keys(capturedFiles).forEach(key => { if (capturedFiles[key]) formDataObj.append(key, capturedFiles[key]) })

    fetch("/", { method: "POST", body: formDataObj })
      .then((response) => {
        if (response.ok) window.location.href = "/success.html"
        else throw new Error(t.form.alertEmail)
      })
      .catch((error) => {
        alert("Error: " + error.message)
        if (btn) { btn.disabled = false; btn.innerText = t.form.submit }
      })
  }

  return (
    <section id="tramite" className="py-24 bg-navy-lightest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-gold-dark font-bold text-sm uppercase tracking-[0.2em]">Application</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-3">{t.form.title}</h2>
          <p className="text-gray-500">{t.form.subtitle}</p>
        </div>

        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step === i ? 'bg-gold text-white shadow-md shadow-gold/30' :
                step > i ? 'bg-navy text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {i}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1.5 hidden md:block">{t.form.steps[i-1]}</span>
            </div>
          ))}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-0">
            <div className="h-full bg-gold transition-all duration-500 rounded-full" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
          <form name="tramite-licencia">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                    <User className="text-gold" size={22} /> {t.form.step1.title}
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} placeholder={t.form.step1.nombrePlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input type="text" name="paisNacimiento" value={formData.paisNacimiento} onChange={handleChange} placeholder={t.form.step1.paisNacPlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                      </div>
                      <div>
                        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                      </div>
                    </div>
                    <div>
                      <input type="text" name="paisResidencia" value={formData.paisResidencia} onChange={handleChange} placeholder={t.form.step1.paisResPlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                    </div>
                    <div>
                      <select name="vigencia" value={formData.vigencia} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all">
                        <option value="1 year">1 Año - $70 USD</option>
                        <option value="2 years">2 Años - $100 USD</option>
                        <option value="5 years">5 Años - $150 USD</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                    <FileText className="text-gold" size={22} /> {t.form.step2.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <input type="text" name="estatura" value={formData.estatura} onChange={handleChange} placeholder={t.form.step2.estaturaPlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                    </div>
                    <div>
                      <select name="tipoSangre" value={formData.tipoSangre} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required>
                        <option value="">--</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div>
                      <input type="text" name="colorOjos" value={formData.colorOjos} onChange={handleChange} placeholder={t.form.step2.ojosPlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
                    <Camera className="text-gold" size={22} /> {t.form.step3.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{t.form.step3.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['fotoCarnet', 'fotoFirma', 'fotoID', 'fotoLicencia'].map((field) => {
                      const labels = { fotoCarnet: t.form.step3.carnet, fotoFirma: t.form.step3.firma, fotoID: t.form.step3.idDoc, fotoLicencia: t.form.step3.licencia }
                      return (
                        <div key={field}>
                          <label className="block text-sm font-medium text-navy mb-1.5">{labels[field]}</label>
                          <input type="file" name={field} accept="image/*" onChange={handleFileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-navy file:text-gold file:font-medium file:text-sm hover:file:bg-navy-light cursor-pointer" required />
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                    <Send className="text-gold" size={22} /> {t.form.step4.title}
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.form.step4.emailPlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                    </div>
                    <div>
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder={t.form.step4.telefonoPlaceholder} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" required />
                    </div>
                    <div className="bg-navy-lightest p-4 rounded-xl">
                      <p className="text-xs text-gray-500 leading-relaxed">{t.form.step4.terms}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-navy text-navy font-semibold hover:bg-navy hover:text-white transition-all text-sm">
                  <ChevronLeft size={20} /> {t.form.prev}
                </button>
              ) : <div />}

              {step < totalSteps ? (
                <button type="button" onClick={handleNext} className="btn-gold flex items-center gap-2 px-6 py-3 text-sm">
                  {t.form.next} <ChevronRight size={20} />
                </button>
              ) : (
                <button type="button" id="submit-btn" onClick={handleSubmit} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-semibold hover:bg-navy-light transition-all text-sm">
                  {t.form.submit} <Send size={20} />
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
