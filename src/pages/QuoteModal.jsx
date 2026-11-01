import { useEffect } from 'react'
import QuoteForm from './QuoteForm'

export default function QuoteModal({ onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex overflow-y-auto bg-black/60 p-4" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Free quote">
      <div className="relative m-auto w-full max-w-md rounded-2xl bg-white p-6 text-forest">
        <button onClick={onClose} aria-label="Close" className="absolute right-2 top-2 h-10 w-10 text-2xl">×</button>
        <QuoteForm id="m" />
      </div>
    </div>
  )
}
