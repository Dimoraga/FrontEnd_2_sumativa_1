import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { useInventory, formatCLP } from '../context/InventoryContext.jsx'

export default function ItemDetail() {
  const { id } = useParams()
  const { items, addToCart, cartItems } = useInventory()
  const item = items.find((i) => i.id === Number(id))
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!item) {
    return (
      <>
        <PageTitle title="Artículo no encontrado" />
        <Button to="/inventario" variant="secondary">Volver al inventario</Button>
      </>
    )
  }

  const inCart = cartItems.find((c) => c.id === item.id)?.quantity || 0
  const safeQty = Math.max(1, Math.min(qty, item.stock))

  const onAdd = () => {
    addToCart(item.id, safeQty)
    setQty(1)
    setAdded(true)
  }

  return (
    <>
      <PageTitle title={item.name} subtitle={`Marca: ${item.brand}`} />
      <Card className="max-w-xl">
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-slate-500">Tipo</dt><dd>{item.subtype ? `${item.type} · ${item.subtype}` : item.type}</dd>
          <dt className="text-slate-500">Precio</dt><dd className="font-semibold">{formatCLP(item.price)}</dd>
          <dt className="text-slate-500">Disponible</dt>
          <dd className={item.stock === 0 ? 'font-semibold text-red-600' : ''}>{item.stock === 0 ? 'Agotado' : item.stock}</dd>
          <dt className="text-slate-500">En tu carrito</dt><dd>{inCart}</dd>
        </dl>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="number"
            min="1"
            max={item.stock}
            value={safeQty}
            disabled={item.stock === 0}
            onChange={(e) => setQty(Number(e.target.value) || 1)}
            aria-label="Cantidad"
            className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <Button onClick={onAdd} disabled={item.stock === 0}>Agregar al carrito</Button>
          <Button to="/inventario" variant="ghost">Volver</Button>
        </div>
        {added && (
          <p className="mt-3 text-sm text-green-700">
            Agregado. <Link to="/carrito" className="underline">Ir al carrito</Link>
          </p>
        )}
      </Card>
    </>
  )
}
