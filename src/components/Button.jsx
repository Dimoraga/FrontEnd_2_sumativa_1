import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-red-700 text-white hover:bg-red-800 disabled:bg-slate-300',
  secondary: 'bg-white text-red-700 ring-1 ring-red-700 hover:bg-red-50',
  ghost: 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40',
}

export default function Button({ to, variant = 'primary', className = '', ...props }) {
  const cls = `inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed ${variants[variant]} ${className}`
  return to ? <Link to={to} className={cls} {...props} /> : <button className={cls} {...props} />
}
