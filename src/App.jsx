import { useState, createContext, useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Requirements from './components/Requirements'
import ApplicationForm from './components/ApplicationForm'
import SearchLicense from './components/SearchLicense'
import FAQ from './components/FAQ'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import { translations } from './data/translations'

export const LangContext = createContext()

export const useLang = () => useContext(LangContext)

function App() {
  const [lang, setLang] = useState('es')
  const [isAdmin, setIsAdmin] = useState(false)
  const t = translations[lang]
  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es')

  useEffect(() => {
    const checkHash = () => setIsAdmin(window.location.hash === '#admin')
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  if (isAdmin) {
    return (
      <LangContext.Provider value={{ lang, t, toggleLang }}>
        <AdminPanel />
      </LangContext.Provider>
    )
  }

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <Pricing />
          <Requirements />
          <ApplicationForm />
          <SearchLicense />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  )
}

export default App
