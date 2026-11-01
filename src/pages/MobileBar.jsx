import { TEL, WA } from '../data/content'

export default function MobileBar({ onOpen }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-paper px-3 pt-2 lg:hidden" style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom,0px))' }}>
      <a href={TEL} className="btn btn-ghost !min-h-[46px] flex-1 !px-2 text-sm">Call</a>
      <a href={WA} className="btn !min-h-[46px] flex-1 !border-[#1f9d55] !bg-[#1f9d55] !px-2 text-sm !text-white">WhatsApp</a>
      <button onClick={onOpen} className="btn !min-h-[46px] flex-1 !px-2 text-sm">Free quote</button>
    </div>
  )
}
