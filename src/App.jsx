import { useState, createContext, useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { UrgencyTopBar, StickyMobileCTA } from './components/UrgencyBar'
import CounterSection from './components/CounterSection'
import Testimonials from './components/Testimonials'
import DocumentShowcase from './components/DocumentShowcase'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import TrustBadges from './components/TrustBadges'
import Requirements from './components/Requirements'
import ApplicationForm from './components/ApplicationForm'
import SearchLicense from './components/SearchLicense'
import FAQ from './components/FAQ'
import AdminPanel from './components/AdminPanel'
import WhatsAppButton from './components/WhatsAppButton'
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
        <UrgencyTopBar />
        <Navbar />
        <main>
          <Hero />
          <CounterSection />
          <SearchLicense />
          <HowItWorks />
          <Pricing />
          <TrustBadges />
          <Testimonials />
          <DocumentShowcase />
          <Requirements />
          <ApplicationForm />
          <FAQ />
        </main>
        <Footer />
        <StickyMobileCTA />
      </div>
    </LangContext.Provider>
  )
}

export default App
