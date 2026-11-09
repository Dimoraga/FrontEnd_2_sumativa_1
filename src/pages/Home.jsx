import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Logo from '../components/Logo.jsx'
import { categoryIcons } from '../components/Badge.jsx'
import { CATEGORIES, useInventory } from '../context/InventoryContext.jsx'

export default function Home() {
  const { items } = useInventory()
  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-700 to-red-500 px-6 py-12 text-center text-white shadow-lg sm:py-16">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-yellow-300/10" />
        <Logo className="relative mx-auto mb-4 h-20 w-20 drop-shadow-lg" />
        <h1 className="relative text-3xl font-extrabold tracking-tight sm:text-5xl">Cadena de supermercados Don Honesto</h1>
        <p className="relative mx-auto mt-4 max-w-2xl text-red-50">
          Gestión de inventario: registra productos, consulta el stock y administra tu carrito de compras.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/inventario" className="!bg-yellow-400 !text-red-900 shadow hover:!bg-yellow-300">Ver inventario</Button>
          <Button to="/agregar" variant="secondary" className="!bg-transparent !text-white !ring-white/70 hover:!bg-white/10">
            + Agregar artículo
          </Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-slate-800">Explora por categoría</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c) => {
            const count = items.filter((i) => i.type === c).length
            return (
              <Link
                key={c}
                to={`/inventario?categoria=${encodeURIComponent(c)}`}
                className="group rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-red-300"
              >
                <div className="text-3xl transition group-hover:scale-110">{categoryIcons[c]}</div>
                <p className="mt-2 text-sm font-semibold">{c}</p>
                <p className="text-xs text-slate-500">{count} productos</p>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
