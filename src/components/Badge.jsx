const colors = {
  'Lácteos': 'bg-sky-100 text-sky-800',
  'Panadería': 'bg-amber-100 text-amber-800',
  'Bebidas': 'bg-indigo-100 text-indigo-800',
  'Abarrotes': 'bg-orange-100 text-orange-800',
  'Carnes': 'bg-rose-100 text-rose-800',
  'Frutas y Verduras': 'bg-green-100 text-green-800',
  'Limpieza': 'bg-teal-100 text-teal-800',
}

export const categoryIcons = {
  'Lácteos': '🥛',
  'Panadería': '🥖',
  'Bebidas': '🥤',
  'Abarrotes': '🍝',
  'Carnes': '🥩',
  'Frutas y Verduras': '🍎',
  'Limpieza': '🧼',
}

export default function Badge({ type, children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[type] || 'bg-slate-100 text-slate-700'}`}>
      {children}
    </span>
  )
}

export function StockBadge({ stock }) {
  if (stock === 0) return <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">Agotado</span>
  if (stock <= 10) return <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">Quedan {stock}</span>
  return <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">{stock} disp.</span>
}
