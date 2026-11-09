import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { useInventory } from '../context/InventoryContext.jsx'

export default function Header() {
  const { cartCount } = useInventory()
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-red-800 to-red-600 text-white shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight sm:text-xl">
          <Logo className="h-9 w-9 drop-shadow" /> Don Honesto
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link to="/inventario" className="rounded-full px-3 py-1.5 hover:bg-white/15">Inventario</Link>
          <Link to="/carrito" className="relative rounded-full bg-white px-3 py-1.5 text-red-700 shadow-sm hover:bg-red-50">
            🛒 Carrito
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-xs font-bold text-red-900">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
