import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BottomNav from './BottomNav.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-red-50/60 to-slate-50 font-sans text-slate-800">
      <Header />
      <main key={pathname} className="animate-fade-up mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-10">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
