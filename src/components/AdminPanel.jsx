import { useState, useEffect } from 'react'
import { Lock, LayoutDashboard, Users, FileText, LogOut, ArrowLeft, Search, RefreshCw, ShieldCheck, Download, Eye, X, ExternalLink, Plus, Check } from 'lucide-react'
import { useLang } from '../App'

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') inQuotes = !inQuotes
    else if (c === ',' && !inQuotes) { result.push(current.trim()); current = '' }
    else current += c
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
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState({ docId: '', nombre: '', vencimiento: '', categoria: '', link: '', tramite: '', nacimiento: '', nacionalidad: '', estatura: '', sangre: '', ojos: '', foto: '' })
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    if (isLoggedIn) fetchLicenses()
  }, [isLoggedIn])

  const fetchLicenses = async () => {
    setLoading(true)
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
          nacionalidad: r[8] || '', estatura: r[9] || '',
          tipoSangre: r[10] || '', colorOjos: r[11] || '',
          fotoUrl: r[12] || '',
        }
      })
      setLicenses(data)
    } catch (e) { console.error(e) }
    setLoading(false)
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
  }

  const exportCSV = () => {
    const header = 'Documento,ID Tramite,Nombre,Vencimiento,Estado,Categoria,LINK,Fecha Nac,Nacionalidad,Estatura,Sangre,Ojos,Foto URL'
    const rows = licenses.map(l =>
      `${l.id},${l.id_tramite},"${l.nombre}",${l.validoHasta},${l.estado},${l.tipo},${l.link},${l.fechaNacimiento},${l.nacionalidad},${l.estatura},${l.tipoSangre},${l.colorOjos},${l.fotoUrl}`
    ).join('\n')
    const blob = new Blob([header + '\n' + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `LIO-licencias-${new Date().toISOString().slice(0,10)}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const handleAddChange = (e) => {
    const { name, value } = e.target
    setAddForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!addForm.docId || !addForm.nombre) { alert(lang === 'es' ? 'Completa Documento y Nombre' : 'Complete Document and Name'); return }
    const csvLine = `${addForm.docId},${addForm.tramite},"${addForm.nombre}",${addForm.vencimiento},ACTIVA,${addForm.categoria},${addForm.link},${addForm.nacimiento},${addForm.nacionalidad},${addForm.estatura},${addForm.sangre},${addForm.ojos},${addForm.foto}`
    navigator.clipboard.writeText(csvLine)
    setAddSuccess(true)
    setTimeout(() => setAddSuccess(false), 3000)
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
            <input type="password" placeholder={t.admin.password} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-center text-sm" />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-dark transition-all shadow-sm text-sm">{t.admin.enter}</button>
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
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">LIO</span></div>
            <div>
              <h1 className="text-white font-bold text-sm">{t.admin.dashboard}</h1>
              <p className="text-gray-400 text-[10px]">{t.admin.dashboardSub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-gray-400 hover:text-accent transition-colors text-xs flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/5">
              <ArrowLeft size={14} /> {lang === 'es' ? 'Sitio' : 'Site'}
            </a>
            <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all text-xs">
              <LogOut size={14} /> {t.admin.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-accent-subtle rounded-lg"><Users size={22} className="text-accent" /></div>
            <div>
              <span className="text-2xl font-bold text-primary">{stats.total}</span>
              <p className="text-xs text-text-muted">{t.admin.totalLicenses}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg"><ShieldCheck size={22} className="text-green-700" /></div>
            <div>
              <span className="text-2xl font-bold text-primary">{stats.activas}</span>
              <p className="text-xs text-text-muted">{t.admin.active}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-accent-subtle rounded-lg"><FileText size={22} className="text-accent" /></div>
            <div>
              <span className="text-2xl font-bold text-primary">{licenses.length - stats.activas}</span>
              <p className="text-xs text-text-muted">{t.admin.expired}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-primary-light flex items-center gap-4">
            <div className="p-3 bg-accent-subtle rounded-lg"><Download size={22} className="text-accent" /></div>
            <div className="flex-1">
              <button onClick={exportCSV} className="text-accent font-bold text-sm hover:underline">{lang === 'es' ? 'Exportar CSV' : 'Export CSV'}</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-primary-light overflow-hidden mb-6">
          <div className="p-5 border-b border-primary-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-primary text-sm">{lang === 'es' ? 'Registro de Licencias' : 'License Registry'}</h3>
              <button onClick={() => { setAddForm({ docId: '', nombre: '', vencimiento: '', categoria: '', link: '', tramite: '', nacimiento: '', nacionalidad: '', estatura: '', sangre: '', ojos: '' }); setShowAddForm(!showAddForm) }} className="flex items-center gap-1 text-accent text-xs font-semibold hover:underline">
                <Plus size={14} /> {lang === 'es' ? 'Nuevo' : 'New'}
              </button>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={lang === 'es' ? 'Buscar...' : 'Search...'} className="w-full pl-9 pr-4 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" />
              </div>
              <button onClick={fetchLicenses} className="p-2 rounded-lg border border-primary-light text-text-muted hover:text-accent hover:border-accent transition-colors">
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className="p-5 border-b border-primary-light bg-accent-subtle">
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="docId" value={addForm.docId} onChange={handleAddChange} placeholder={t.admin.docNumPlaceholder} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="nombre" value={addForm.nombre} onChange={handleAddChange} placeholder={t.admin.namePlaceholder} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="tramite" value={addForm.tramite} onChange={handleAddChange} placeholder={lang === 'es' ? 'ID Trámite' : 'App ID'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="vencimiento" value={addForm.vencimiento} onChange={handleAddChange} placeholder={t.admin.expiryLabel} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="categoria" value={addForm.categoria} onChange={handleAddChange} placeholder={t.admin.categoryLabel} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="link" value={addForm.link} onChange={handleAddChange} placeholder={lang === 'es' ? 'LINK' : 'LINK'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="nacimiento" value={addForm.nacimiento} onChange={handleAddChange} placeholder={lang === 'es' ? 'F. Nacimiento' : 'D.O.B.'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="nacionalidad" value={addForm.nacionalidad} onChange={handleAddChange} placeholder={lang === 'es' ? 'Nacionalidad' : 'Nationality'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="estatura" value={addForm.estatura} onChange={handleAddChange} placeholder={lang === 'es' ? 'Estatura' : 'Height'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="sangre" value={addForm.sangre} onChange={handleAddChange} placeholder={lang === 'es' ? 'Tipo Sangre' : 'Blood Type'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="ojos" value={addForm.ojos} onChange={handleAddChange} placeholder={lang === 'es' ? 'Color Ojos' : 'Eye Color'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <input type="text" name="foto" value={addForm.foto} onChange={handleAddChange} placeholder={lang === 'es' ? 'URL Foto' : 'Photo URL'} className="px-3 py-2 rounded-lg border border-primary-light text-sm outline-none focus:border-accent" />
                <div className="md:col-span-3 flex gap-2">
                  <button type="submit" className="flex items-center gap-1.5 bg-accent text-white font-semibold px-4 py-2 rounded-lg hover:bg-accent-dark transition-all text-sm">
                    {addSuccess ? <><Check size={16} /> {lang === 'es' ? 'Copiado' : 'Copied'}</> : lang === 'es' ? 'Generar línea CSV' : 'Generate CSV line'}
                  </button>
                  {addSuccess && <p className="text-green-700 text-xs self-center">{lang === 'es' ? '¡Pegá en tu Sheet!' : 'Paste into your Sheet!'}</p>}
                </div>
              </form>
            </div>
          )}

          {loading ? (
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
                    <th className="text-right p-3 font-semibold text-primary text-[10px] uppercase tracking-wider">{lang === 'es' ? 'Acción' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lic, i) => (
                    <tr key={i} className="border-b border-primary-light last:border-0 hover:bg-bg-section transition-colors">
                      <td className="p-3 font-medium text-primary">{lic.id}</td>
                      <td className="p-3 text-text-main">{lic.nombre}</td>
                      <td className="p-3 text-text-muted">{lic.validoHasta}</td>
                      <td className="p-3"><span className="bg-accent-subtle text-accent text-[11px] font-semibold px-2 py-0.5 rounded">{lic.tipo}</span></td>
                      <td className="p-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${lic.estado?.toUpperCase() === 'ACTIVA' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          {lic.estado}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => setSelected(lic)} className="text-accent hover:underline text-xs font-semibold flex items-center gap-1 ml-auto">
                          <Eye size={14} /> {lang === 'es' ? 'Detalle' : 'Detail'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-text-muted hover:text-primary transition-colors">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary-light">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-accent font-bold">LIO</span>
              </div>
              <div>
                <p className="font-bold text-primary">{selected.nombre}</p>
                <p className="text-[10px] text-text-muted">#{selected.id}</p>
              </div>
              <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full ${selected.estado?.toUpperCase() === 'ACTIVA' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {selected.estado}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.admin.docNumLabel, value: selected.id },
                { label: t.admin.idTramite || 'ID Trámite', value: selected.id_tramite },
                { label: t.admin.categoryLabel, value: selected.tipo },
                { label: t.admin.expiryLabel, value: selected.validoHasta },
                { label: t.search.dob, value: selected.fechaNacimiento },
                { label: t.search.nationality, value: selected.nacionalidad },
                { label: t.search.height, value: selected.estatura },
                { label: t.search.bloodType, value: selected.tipoSangre },
                { label: t.search.eyeColor, value: selected.colorOjos },
              ].map((f, i) => f.value ? (
                <div key={i}>
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{f.label}</span>
                  <p className="font-semibold text-primary text-sm">{f.value}</p>
                </div>
              ) : null)}
            </div>
            {selected.link && (
              <div className="mt-4 pt-4 border-t border-primary-light">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">LINK</span>
                <p className="font-semibold text-primary text-sm break-all">{selected.link}</p>
              </div>
            )}
            {selected.fotoUrl && (
              <div className="mt-4 pt-4 border-t border-primary-light">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Foto URL</span>
                <a href={selected.fotoUrl} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 mt-0.5">
                  <ExternalLink size={14} /> {lang === 'es' ? 'Abrir Foto' : 'Open Photo'}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
