import { useState } from 'react'

export default function QuoteForm({ id }) {
  const [v, setV] = useState({ name: '', phone: '', type: '', scope: 'Full home interiors' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setV({ ...v, [k]: k === 'phone' ? e.target.value.replace(/\D/g, '') : e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const er = {
      name: v.name.trim().length < 2 && 'Please enter your name.',
      phone: !/^[6-9]\d{9}$/.test(v.phone) && 'Enter a valid 10-digit mobile number.',
      type: !v.type && 'Please select a property type.',
    }
    setErr(er)
    if (!Object.values(er).some(Boolean)) setDone(true) // demo only: nothing is sent
  }

  if (done)
    return (
      <div role="status" className="py-6 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-moss text-2xl text-white">✓</div>
        <h3 className="font-serif text-2xl">Thank you, {v.name.split(' ')[0]}!</h3>
        <p className="mt-2 text-mute">A designer will call you on {v.phone} to plan your free consultation.</p>
        <p className="mt-3 text-xs text-mute">Demo only. Nothing was sent.</p>
      </div>
    )

  const field = (k, label, control) => (
    <div className="mb-3">
      <label htmlFor={`${k}${id}`} className="mb-1 block text-sm font-bold">{label}</label>
      {control}
      {err[k] && <p className="mt-1 text-sm text-red-700">{err[k]}</p>}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate>
      <h3 className="font-serif text-2xl">Get your free design quote</h3>
      <p className="mb-4 mt-1 text-sm text-mute">Takes 30 seconds. No obligation.</p>
      {field('name', 'Full name', <input id={`name${id}`} className="field" autoComplete="name" value={v.name} onChange={set('name')} placeholder="Your name" />)}
      {field('phone', 'Mobile number', <input id={`phone${id}`} className="field" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={v.phone} onChange={set('phone')} placeholder="10-digit mobile number" />)}
      {field('type', 'Property type',
        <select id={`type${id}`} className="field" value={v.type} onChange={set('type')}>
          <option value="">Select property type</option>
          {['2 BHK Apartment', '3 BHK Apartment', '4 BHK / Penthouse', 'Independent House', 'Villa / Bungalow'].map((o) => <option key={o}>{o}</option>)}
        </select>)}
      {field('scope', 'What do you need?',
        <select id={`scope${id}`} className="field" value={v.scope} onChange={set('scope')}>
          {['Full home interiors', 'Modular kitchen', 'Wardrobes / storage', 'Renovation'].map((o) => <option key={o}>{o}</option>)}
        </select>)}
      <button className="btn w-full" type="submit">Get my free quote</button>
      <p className="mt-3 text-center text-xs text-mute">Your details stay private and are never shared or sold.</p>
    </form>
  )
}
