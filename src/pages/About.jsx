import PageTitle from '../components/PageTitle.jsx'
import Card from '../components/Card.jsx'

const stats = [
  { value: '1963', label: 'Año de fundación' },
  { value: '+28', label: 'Supermercados' },
  { value: '+3000', label: 'Colaboradores' },
  { value: '3ª', label: 'Generación familiar' },
]

const timeline = [
  { year: '1963', text: 'Don Honesto Muñoz funda un pequeño almacén en Curicó.' },
  { year: '1974', text: 'Apertura de la segunda sucursal.' },
  { year: '1976', text: 'Tercera sucursal, en la ciudad de Rancagua.' },
  { year: '1983', text: 'Cuarta sucursal y primera en la capital.' },
  { year: '1988', text: 'Apertura de tres nuevas sucursales en Valparaíso, Viña del Mar y Quillota.' },
  { year: '1995', text: 'Expansión hacia el sur de Chile: Chillán, Concepción, Temuco y Valdivia.' },
  { year: 'Hoy', text: 'Más de 28 supermercados presentes desde la región de Coquimbo hasta Los Lagos.' },
]

const values = [
  { icon: '⭐', title: 'Calidad', text: 'Siempre entregar la mayor calidad a nuestros clientes.' },
  { icon: '💲', title: 'Precios bajos', text: 'Los precios más bajos posibles, con garantía de igualación.' },
  { icon: '🌱', title: 'Vínculo local', text: 'Alianzas con pequeños productores y un lazo especial con Curicó y su región.' },
]

export default function About() {
  return (
    <>
      <PageTitle title="Quiénes somos" />
      <Card>
        <h2 className="mb-3 text-xl font-semibold">Cadena de supermercados Don Honesto</h2>
        <p className="leading-relaxed text-slate-700">
          Don Honesto es una cadena de supermercados originaria de Curicó, fundada en el año 1963 por don Honesto Muñoz,
          quien fundó un pequeño almacén el que, con mucho trabajo y sacrificio, se ha transformado en una cadena de más
          de 28 supermercados presentes desde la región de Coquimbo hasta Los Lagos. El éxito no ha modificado nuestros valores fundamentales, los cuales
          se sintetizan en siempre entregar la mayor calidad a sus clientes a los precios más bajos posibles. Contamos con más de 3000 colaboradores a lo largo de todo Chile, quienes se encargan de entregar la mejor experiencia a nuestros clientes.
        </p>
      </Card>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-gradient-to-br from-red-700 to-red-500 p-4 text-center text-white shadow">
            <p className="text-3xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-xs text-red-50 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Nuestra historia</h2>
        <ol className="space-y-4 border-l-2 border-yellow-400 pl-5">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-red-700 ring-4 ring-white" />
              <p className="text-sm font-bold text-red-800">{t.year}</p>
              <p className="text-slate-700">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Nuestros valores</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="text-center">
              <div className="text-3xl">{v.icon}</div>
              <h3 className="mt-2 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{v.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
