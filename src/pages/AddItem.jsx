import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField, { inputClass } from '../components/FormField.jsx'
import { useInventory, CATEGORIES } from '../context/InventoryContext.jsx'

const empty = { name: '', brand: '', type: CATEGORIES[0], price: '', stock: '' }

export default function AddItem() {
  const { addItem } = useInventory()
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Ingresa el nombre'
    if (!form.brand.trim()) e.brand = 'Ingresa la marca'
    if (!(Number(form.price) > 0)) e.price = 'El precio debe ser mayor a 0'
    if (form.stock === '' || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) e.stock = 'Cantidad inválida'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    addItem({
      name: form.name.trim(),
      brand: form.brand.trim(),
      type: form.type,
      price: Number(form.price),
      stock: Number(form.stock),
    })
    navigate('/inventario')
  }

  return (
    <>
      <PageTitle title="Agregar artículo" subtitle="Registra un nuevo producto en el inventario." />
      <Card>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
          <FormField label="Nombre" error={errors.name}>
            <input value={form.name} onChange={set('name')} className={inputClass} />
          </FormField>
          <FormField label="Marca" error={errors.brand}>
            <input value={form.brand} onChange={set('brand')} className={inputClass} />
          </FormField>
          <FormField label="Tipo de producto">
            <select value={form.type} onChange={set('type')} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Precio (CLP)" error={errors.price}>
            <input type="number" min="1" value={form.price} onChange={set('price')} className={inputClass} />
          </FormField>
          <FormField label="Cantidad disponible" error={errors.stock}>
            <input type="number" min="0" value={form.stock} onChange={set('stock')} className={inputClass} />
          </FormField>
          <div className="flex items-end gap-2">
            <Button type="submit">Guardar artículo</Button>
            <Button type="button" variant="ghost" onClick={() => setForm(empty)}>Limpiar</Button>
          </div>
        </form>
      </Card>
    </>
  )
}
