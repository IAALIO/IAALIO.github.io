import { useState } from 'react'
import { Lock, LayoutDashboard, UserPlus, FileUp, LogOut, ArrowLeft } from 'lucide-react'
import { useLang } from '../App'

const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions'

const AdminPanel = () => {
  const { t } = useLang()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ docId: '', nombre: '', vencimiento: '', categoria: '', file: null })
  const [uploading, setUploading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    const adminPwd = import.meta.env.VITE_ADMIN_PASSWORD || 'LIO-ADMIN-2024'
    if (password === adminPwd) {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError(t.admin.wrongPwd)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    if (e.target.files[0]) setForm(prev => ({ ...prev, file: e.target.files[0] }))
  }

  const handlePublish = async () => {
    if (!form.docId || !form.nombre || !form.vencimiento) {
      alert(t.admin.error)
      return
    }
    setUploading(true)
    try {
      const res = await fetch(`${API_URL}/add-license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        alert(t.admin.success)
        setForm({ docId: '', nombre: '', vencimiento: '', categoria: '', file: null })
        const input = document.getElementById('admin-file-input')
        if (input) input.value = ''
      } else {
        throw new Error()
      }
    } catch {
      alert(t.admin.error)
    }
    setUploading(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-navy mb-8 transition-colors">
            <ArrowLeft size={16} /> {t.admin.unauthorized}
          </a>
          <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="text-gold" size={28} />
          </div>
          <h2 className="text-xl font-bold text-navy text-center mb-6">{t.admin.title}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder={t.admin.password} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-center" />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-navy text-white py-3.5 rounded-xl font-semibold hover:bg-navy-light transition-all shadow-lg">{t.admin.enter}</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-xl flex items-center justify-center">
            <span className="text-navy font-bold text-sm">L</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">{t.admin.dashboard}</h1>
            <p className="text-gray-400 text-xs">{t.admin.dashboardSub}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-gray-400 hover:text-gold transition-colors text-sm flex items-center gap-1.5">
            <ArrowLeft size={16} /> {t.admin.unauthorized}
          </a>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all text-sm">
            <LogOut size={16} /> {t.admin.logout}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-navy rounded-xl"><UserPlus size={24} className="text-gold" /></div>
            <div>
              <span className="text-2xl font-bold text-navy">-</span>
              <p className="text-xs text-gray-500">{t.admin.pending}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-navy rounded-xl"><FileUp size={24} className="text-gold" /></div>
            <div>
              <span className="text-2xl font-bold text-navy">-</span>
              <p className="text-xs text-gray-500">{t.admin.issued}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-navy rounded-xl"><Lock size={24} className="text-gold" /></div>
            <div>
              <span className="text-2xl font-bold text-navy">99.9%</span>
              <p className="text-xs text-gray-500">{t.admin.uptime}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-navy mb-2">{t.admin.newLicense}</h3>
          <p className="text-sm text-gray-500 mb-6">{t.admin.newLicenseDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">{t.admin.docNumLabel}</label>
              <input type="text" name="docId" value={form.docId} onChange={handleChange} placeholder={t.admin.docNumPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">{t.admin.nameLabel}</label>
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder={t.admin.namePlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">{t.admin.expiryLabel}</label>
              <input type="date" name="vencimiento" value={form.vencimiento} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">{t.admin.categoryLabel}</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all">
                <option value="">--</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="A-B">A-B</option>
                <option value="B-C">B-C</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-navy mb-1.5">{t.admin.fileLabel}</label>
              <input id="admin-file-input" type="file" onChange={handleFile} className="w-full px-4 py-3 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-navy file:text-gold file:font-medium file:text-sm hover:file:bg-navy-light cursor-pointer" />
            </div>
            <div className="md:col-span-2">
              <button onClick={handlePublish} disabled={uploading} className="w-full bg-gold text-navy font-bold py-3.5 rounded-xl hover:bg-gold-dark transition-all shadow-lg shadow-gold/30 disabled:opacity-50">
                {uploading ? '...' : t.admin.publish}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
