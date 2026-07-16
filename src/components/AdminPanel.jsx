import { useState, useEffect } from 'react'
import { Lock, LayoutDashboard, Users, FileText, LogOut, ArrowLeft, Search, RefreshCw, ShieldCheck } from 'lucide-react'
import { useLang } from '../App'

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') inQuotes = !inQuotes
    else if (char === ',' && !inQuotes) { result.push(current.trim()); current = '' }
    else current += char
  }
  result.push(current.trim())
  return result
}

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcLOEKNE8N8-dRiH9ZhFxxbpK59mSE8gc-Of1wya6QH6HuOQvs1l6pFnxM35HoUhUsOCI12p03n5YY/pub?output=csv'

const AdminPanel = () => {
  const { t, lang } = useLang()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [licenses, setLicenses] = useState([])
  const [loadingLicenses, setLoadingLicenses] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isLoggedIn) fetchLicenses()
  }, [isLoggedIn])

  const fetchLicenses = async () => {
    setLoadingLicenses(true)
    try {
      const res = await fetch(CSV_URL)
      const text = await res.text()
      const lines = text.split('\n').filter(l => l.trim())
      const data = lines.slice(1).map(line => {
        const r = parseCSVLine(line)
        return {
          id: r[0], id_tramite: r[1], nombre: r[2],
          validoHasta: r[3], estado: r[4], tipo: r[5],
          link: r[6] || '', fechaNacimiento: r[7] || '',
          nacionalidad: r[8] || '',
        }
      })
      setLicenses(data)
    } catch (e) {
      console.error(e)
    }
    setLoadingLicenses(false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const adminPwd = import.meta.env.VITE_ADMIN_PASSWORD || 'LIO-ADMIN-2024'
    if (password === adminPwd) { setIsLoggedIn(true); setError('') }
    else setError(t.admin.wrongPwd)
  }

  const filtered = licenses.filter(l =>
    l.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id?.includes(searchQuery) ||
    l.id_tramite?.includes(searchQuery)
  )

  const stats = {
    total: licenses.length,
    activas: licenses.filter(l => l.estado?.toUpperCase() === 'ACTIVA').length,
    vencidas: licenses.filter(l => l.estado?.toUpperCase() !== 'ACTIVA').length,
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm border-t-4 border-accent">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-8 transition-colors">
            <ArrowLeft size={16} /> {t.admin.unauthorized}
          </a>
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Lock className="text-accent" size={24} />
          </div>
          <h2 className="text-xl font-bold text-primary text-center mb-6">{t.admin.title}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder={t.admin.password} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-center text-sm" />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-accent-dark transition-all shadow-sm text-sm">{t.admin.enter}</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-section">
      <div className="bg-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"><span className="text-primary font-bold text-xs">LIO</span></div>
            <div>
              <h1 className="text-white font-bold text-sm">{t.admin.dashboard}</h1>
              <p className="text-gray-400 text-[10px]">{t.admin.dashboardSub}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-400 hover:text-accent transition-colors text-xs flex items-center gap-1"><ArrowLeft size={14} /> Sitio</a>
            <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all text-xs"><LogOut size={14} /> {t.admin.logout}</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-primary rounded-lg"><Users size={22} className="text-accent" /></div>
            <div>
              <span className="text-2xl font-bold text-primary">{stats.total}</span>
              <p className="text-xs text-text-muted">{t.admin.totalLicenses}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg"><ShieldCheck size={22} className="text-green-700" /></div>
            <div>
              <span className="text-2xl font-bold text-primary">{stats.activas}</span>
              <p className="text-xs text-text-muted">{t.admin.active}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-primary rounded-lg"><FileText size={22} className="text-accent" /></div>
            <div>
              <span className="text-2xl font-bold text-primary">{stats.vencidas}</span>
              <p className="text-xs text-text-muted">{t.admin.expired}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-primary-light overflow-hidden">
          <div className="p-5 border-b border-primary-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-primary text-sm">{lang === 'es' ? 'Registro de Licencias' : 'License Registry'}</h3>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={lang === 'es' ? 'Buscar...' : 'Search...'} className="w-full pl-9 pr-4 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
              <button onClick={fetchLicenses} className="p-2 rounded-lg border border-primary-light text-text-muted hover:text-primary hover:border-primary transition-colors">
                <RefreshCw size={16} className={loadingLicenses ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {loadingLicenses ? (
            <div className="p-10 text-center text-text-muted text-sm">{lang === 'es' ? 'Cargando...' : 'Loading...'}</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-text-muted text-sm">{lang === 'es' ? 'Sin resultados' : 'No results'}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-section border-b border-primary-light">
                    <th className="text-left p-3 font-semibold text-primary text-[10px] uppercase tracking-wider">{t.admin.docNumLabel}</th>
                    <th className="text-left p-3 font-semibold text-primary text-[10px] uppercase tracking-wider">{t.admin.nameLabel}</th>
                    <th className="text-left p-3 font-semibold text-primary text-[10px] uppercase tracking-wider">{t.admin.expiryLabel}</th>
                    <th className="text-left p-3 font-semibold text-primary text-[10px] uppercase tracking-wider">{t.admin.categoryLabel}</th>
                    <th className="text-left p-3 font-semibold text-primary text-[10px] uppercase tracking-wider">{t.admin.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lic, i) => (
                    <tr key={i} className="border-b border-primary-light last:border-0 hover:bg-bg-section transition-colors">
                      <td className="p-3 font-medium text-primary">{lic.id}</td>
                      <td className="p-3 text-text-main">{lic.nombre}</td>
                      <td className="p-3 text-text-muted">{lic.validoHasta}</td>
                      <td className="p-3"><span className="bg-primary-light text-primary text-[11px] font-semibold px-2 py-0.5 rounded">{lic.tipo}</span></td>
                      <td className="p-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${lic.estado?.toUpperCase() === 'ACTIVA' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          {lic.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
