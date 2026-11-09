export default function PageTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-red-800 sm:text-3xl">{title}</h1>
      <div className="mt-2 h-1 w-12 rounded-full bg-yellow-400" />
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    </div>
  )
}
