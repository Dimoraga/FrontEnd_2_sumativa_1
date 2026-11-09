import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge, { StockBadge, categoryIcons } from '../components/Badge.jsx'
import { inputClass } from '../components/FormField.jsx'
import { useInventory, CATEGORIES, formatCLP } from '../context/InventoryContext.jsx'

export default function Inventory() {
  const { items } = useInventory()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const category = params.get('categoria') || 'Todas'
  const [search, setSearch] = useState('')

  const setCategory = (c) => (c === 'Todas' ? setParams({}) : setParams({ categoria: c }))

  // Lista derivada: el inventario original (items) permanece intacto.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter(
      (i) =>
        (category === 'Todas' || i.type === category) &&
        (!q || `${i.name} ${i.brand} ${i.subtype}`.toLowerCase().includes(q))
    )
  }, [items, category, search])

  const chip = (active) =>
    `shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
      active ? 'bg-red-700 text-white shadow' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-red-300 hover:text-red-700'
    }`

  return (
    <>
      <PageTitle title="Inventario" subtitle={`${filtered.length} de ${items.length} artículos`} />

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Buscar por nombre o marca…"
          aria-label="Buscar artículos"
          className={`${inputClass} sm:max-w-sm`}
        />
        <Button to="/agregar">+ Agregar artículo</Button>
      </div>

      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-2" role="group" aria-label="Filtrar por categoría">
        <button onClick={() => setCategory('Todas')} className={chip(category === 'Todas')}>Todas</button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={chip(category === c)}>
            {categoryIcons[c]} {c}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-right">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((i) => (
              <tr
                key={i.id}
                onClick={() => navigate(`/inventario/${i.id}`)}
                className="cursor-pointer transition odd:bg-white even:bg-slate-50/50 hover:bg-red-50"
              >
                <td className="px-4 py-3 font-semibold text-slate-800">{i.name}</td>
                <td className="px-4 py-3 text-slate-600">{i.brand}</td>
                <td className="px-4 py-3">
                  <Badge type={i.type}>{i.subtype ? `${i.type} · ${i.subtype}` : i.type}</Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium">{formatCLP(i.price)}</td>
                <td className="px-4 py-3 text-right"><StockBadge stock={i.stock} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  <div className="text-3xl">🛒</div>
                  No se encontraron artículos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  )
}
