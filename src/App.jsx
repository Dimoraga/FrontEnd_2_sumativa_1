import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import AddItem from './pages/AddItem.jsx'
import Inventory from './pages/Inventory.jsx'
import ItemDetail from './pages/ItemDetail.jsx'
import Cart from './pages/Cart.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<About />} />
        <Route path="/preguntas-frecuentes" element={<Faq />} />
        <Route path="/contactanos" element={<Contact />} />
        <Route path="/agregar" element={<AddItem />} />
        <Route path="/inventario" element={<Inventory />} />
        <Route path="/inventario/:id" element={<ItemDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
