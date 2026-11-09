import { useState } from 'react'
import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'

const faqs = [
  { q: '¿Quién fundó Don Honesto?', a: 'Don Honesto Muñoz, en Curicó, el año 1963.' },
  { q: '¿Cuántos supermercados tienen?', a: 'Más de 28, presentes desde Coquimbo hasta Los Lagos.' },
  {
    q: '¿Quiénes son los dueños actuales de Supermercados Don Honesto?',
    a: 'Actualmente, la familia de Don Honesto sigue siendo la principal accionista de la empresa con un total del 72% de las acciones, siendo la tercera generación de la familia que encabeza la empresa. El resto pertenece a bancos y sociedades nacionales.',
  },
  {
    q: '¿Existen vínculos con proveedores locales?',
    a: 'Sí, supermercados Don Honesto se ha preocupado especialmente a lo largo de los años de generar alianzas de colaboración con pequeños productores locales, buscando generar una economía circular con un fuerte componente territorial. Nunca nos olvidamos que nuestros orígenes están en Curicó y mantenemos un vínculo especial con la región.',
  },
  {
    q: '¿Tienen los precios más bajos?',
    a: 'Sí, tenemos los precios más bajos. Nuestra garantía consiste en que si encuentras un precio más bajo nos traes la publicidad y nosotros te igualamos el precio y además te entregamos un 15% de descuento.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageTitle title="Preguntas frecuentes" />
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <Card key={f.q} className="!p-0">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium"
              aria-expanded={open === i}
            >
              {f.q}
              <span className="ml-3 text-red-700">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="px-5 pb-4 text-slate-600">{f.a}</p>}
          </Card>
        ))}
      </div>
    </>
  )
}
