import { useState, useCallback } from 'react'
import Header from './Header'
import Hero from './Hero'
import Stats from './Stats'
import Services from './Services'
import Projects from './Projects'
import Process from './Process'
import WhyUs from './WhyUs'
import Faq from './Faq'
import FinalCta from './FinalCta'
import Footer from './Footer'
import MobileBar from './MobileBar'
import QuoteModal from './QuoteModal'
import Testimonials from './Testimonials'

export default function Home() {
  const [modal, setModal] = useState(false)
  const open = () => setModal(true)
  const close = useCallback(() => setModal(false), [])
  return (
    <>
      <Header onOpen={open} />
      <main id="top">
        <Hero onOpen={open} />
        <Stats />
        <Services onOpen={open} />
        <Projects onOpen={open} />
        <Process onOpen={open} />
        <WhyUs />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar onOpen={open} />
      {modal && <QuoteModal onClose={close} />}
    </>
  )
}
