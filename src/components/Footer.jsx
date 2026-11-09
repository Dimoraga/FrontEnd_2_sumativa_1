import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="bg-red-900 pb-24 text-red-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 font-bold">
          <Logo className="h-8 w-8" /> Don Honesto
        </div>
        <address className="space-y-1 text-sm not-italic">
          <p><span className="font-semibold">Casa matriz:</span> Av. Los Álamos 1523, Curicó.</p>
          <p><span className="font-semibold">Tel.:</span> +53 2 2789636</p>
        </address>
      </div>
    </footer>
  )
}
