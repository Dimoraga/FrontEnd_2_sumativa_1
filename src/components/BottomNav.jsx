import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/quienes-somos', label: 'Quiénes somos', icon: '🏪' },
  { to: '/preguntas-frecuentes', label: 'Preguntas', icon: '❓' },
  { to: '/contactanos', label: 'Contacto', icon: '✉️' },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <ul className="mx-auto flex max-w-5xl justify-around px-2 py-1">
        {links.map((l) => (
          <li key={l.to} className="flex-1">
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `mx-1 flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] transition sm:text-sm ${
                  isActive ? 'bg-red-50 font-semibold text-red-700' : 'text-slate-500 hover:bg-slate-50 hover:text-red-600'
                }`
              }
            >
              <span className="text-xl leading-none">{l.icon}</span>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
