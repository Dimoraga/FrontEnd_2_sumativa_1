import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge, { categoryIcons } from '../components/Badge.jsx'
import { useInventory, formatCLP } from '../context/InventoryContext.jsx'

export default function Cart() {
  const { cartItems, cartTotal, cartCount, addToCart, decreaseFromCart, removeFromCart } = useInventory()

  if (cartItems.length === 0) {
    return (
      <>
        <PageTitle title="Carrito de compras" />
        <Card className="py-12 text-center">
          <div className="text-5xl">🛒</div>
          <p className="mb-5 mt-3 text-slate-600">Tu carrito está vacío.</p>
          <Button to="/inventario">Explorar productos</Button>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Carrito de compras" subtitle={`${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`} />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-3">
          {cartItems.map((i) => (
            <Card key={i.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-2xl">
                  {categoryIcons[i.type] || '📦'}
                </div>
                <div>
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-slate-500">{i.brand} · {formatCLP(i.price)} c/u</p>
                  <div className="mt-1"><Badge type={i.type}>{i.type}</Badge> <span className="ml-1 text-xs text-slate-400">Stock restante: {i.stock}</span></div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
                  <Button variant="ghost" className="!px-3" onClick={() => decreaseFromCart(i.id)} aria-label="Disminuir">−</Button>
                  <span className="w-8 text-center font-semibold">{i.quantity}</span>
                  <Button variant="ghost" className="!px-3" onClick={() => addToCart(i.id)} disabled={i.stock === 0} aria-label="Aumentar">+</Button>
                </div>
                <span className="w-24 text-right font-bold">{formatCLP(i.price * i.quantity)}</span>
                <button onClick={() => removeFromCart(i.id)} aria-label="Quitar del carrito" className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600">🗑️</button>
              </div>
            </Card>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="font-bold">Resumen</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Productos</dt><dd>{cartCount}</dd></div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-lg font-extrabold text-red-800">
                <dt>Total</dt><dd>{formatCLP(cartTotal)}</dd>
              </div>
            </dl>
            <Button to="/inventario" variant="secondary" className="mt-4 w-full">Seguir comprando</Button>
          </Card>
        </aside>
      </div>
    </>
  )
}
