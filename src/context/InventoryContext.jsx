import { createContext, useContext, useMemo, useReducer } from 'react'

export const CATEGORIES = ['Lácteos', 'Panadería', 'Bebidas', 'Abarrotes', 'Carnes', 'Frutas y Verduras', 'Limpieza']


// [nombre, marca, tipo, subtipo, precio, stock]
const seed = [
  ['Leche entera 1L', 'Colun', 'Lácteos', '', 1190, 40],
  ['Leche semidescremada 1L', 'Colún', 'Lácteos', '', 1150, 40],
  ['Leche de frutilla 1L', 'Soprole', 'Lácteos', '', 1290, 30],
  ['Leche de chocolate 1L', 'Soprole', 'Lácteos', '', 1290, 30],
  ['Yoghurt frutilla', 'Nestlé', 'Lácteos', '', 450, 60],
  ['Yoghurt vainilla', 'Nestlé', 'Lácteos', '', 450, 60],
  ['Yoghurt durazno', 'Nestlé', 'Lácteos', '', 450, 60],
  ['Pan hallulla 1kg', 'Castaño', 'Panadería', '', 1890, 25],
  ['Bebida cola 2L', 'Coca-Cola', 'Bebidas', '', 2290, 60],
  ['Arroz grado 1 1kg', 'Tucapel', 'Abarrotes', '', 1590, 50],
  ['Pack 6 salsa de tomate', 'Pomarola', 'Abarrotes', '', 4990, 30],
  ['Fetuccini (paquete)', 'Luchetti', 'Abarrotes', '', 1290, 50],
  ['Ravioles (paquete)', 'Luchetti', 'Abarrotes', '', 2490, 35],
  ['Tallarines (paquete)', 'Luchetti', 'Abarrotes', '', 1190, 60],
  ['Espirales (paquete)', 'Luchetti', 'Abarrotes', '', 1190, 60],
  ['Aceite de girasol 1L', 'Chef', 'Abarrotes', '', 2790, 40],
  ['Aceite de oliva 1L', 'Huasco', 'Abarrotes', '', 8990, 25],
  ['Atún en lata 250 g', 'Robinson Crusoe', 'Abarrotes', '', 2490, 45],
  ['Sal 1kg', 'Lobos', 'Abarrotes', '', 790, 70],
  ['Harina 1kg', 'Selecta', 'Abarrotes', '', 1090, 55],
  ['Harina con polvos de hornear 1kg', 'Selecta', 'Abarrotes', '', 1190, 55],
  ['Detergente 3kg', 'Omo', 'Limpieza', '', 7990, 15],
  ['Lomo vetado', 'Don Honesto', 'Carnes', 'Vacuno', 11990, 20],
  ['Lomo liso', 'Don Honesto', 'Carnes', 'Vacuno', 10990, 20],
  ['Carne molida 500 g', 'Don Honesto', 'Carnes', 'Vacuno', 4290, 35],
  ['Carne molida especial 7% grasa 500 g', 'Don Honesto', 'Carnes', 'Vacuno', 5490, 30],
  ['Punta paleta', 'Don Honesto', 'Carnes', 'Vacuno', 8990, 18],
  ['Punta ganso', 'Don Honesto', 'Carnes', 'Vacuno', 9490, 18],
  ['Lomo de cerdo', 'Don Honesto', 'Carnes', 'Cerdo', 6990, 22],
  ['Chuleta de cerdo', 'Don Honesto', 'Carnes', 'Cerdo', 5990, 25],
  ['Medallón de cerdo', 'Don Honesto', 'Carnes', 'Cerdo', 6490, 20],
  ['Costillas de cerdo', 'Don Honesto', 'Carnes', 'Cerdo', 5490, 25],
  ['Pulpa de cerdo', 'Don Honesto', 'Carnes', 'Cerdo', 5290, 22],
  ['Plateada', 'Don Honesto', 'Carnes', 'Vacuno', 8490, 15],
  ['Manzanas (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1490, 80],
  ['Naranjas (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1290, 80],
  ['Mandarinas (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1590, 70],
  ['Limones (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1990, 50],
  ['Plátanos (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1790, 80],
  ['Cebollas (kg)', 'Don Honesto', 'Frutas y Verduras', '', 990, 90],
  ['Zapallo (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1190, 40],
  ['Tomates (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1890, 60],
  ['Cebollín (atado)', 'Don Honesto', 'Frutas y Verduras', '', 690, 50],
  ['Peras (kg)', 'Don Honesto', 'Frutas y Verduras', '', 1590, 60],
  ['Zanahorias (kg)', 'Don Honesto', 'Frutas y Verduras', '', 890, 80],
  ['Lechuga (unidad)', 'Don Honesto', 'Frutas y Verduras', '', 990, 45],
  ['Brócoli (unidad)', 'Don Honesto', 'Frutas y Verduras', '', 1490, 35],
]

const seedItems = seed.map(([name, brand, type, subtype, price, stock], idx) => ({
  id: idx + 1, name, brand, type, subtype, price, stock,
}))

const initialState = {
  // Lista maestra de artículos: nunca se filtra, el filtro vive en cada vista.
  items: seedItems,
  cart: {}, // { [id]: cantidad }
  nextId: seedItems.length + 1,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, { ...action.item, id: state.nextId }],
        nextId: state.nextId + 1,
      }
    case 'CART_INC': {
      const item = state.items.find((i) => i.id === action.id)
      const qty = Math.min(action.qty ?? 1, item?.stock ?? 0)
      if (!item || qty <= 0) return state
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, stock: i.stock - qty } : i)),
        cart: { ...state.cart, [action.id]: (state.cart[action.id] || 0) + qty },
      }
    }
    case 'CART_DEC': {
      const inCart = state.cart[action.id] || 0
      if (inCart <= 0) return state
      const cart = { ...state.cart }
      if (inCart === 1) delete cart[action.id]
      else cart[action.id] = inCart - 1
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, stock: i.stock + 1 } : i)),
        cart,
      }
    }
    case 'CART_REMOVE': {
      const inCart = state.cart[action.id] || 0
      const cart = { ...state.cart }
      delete cart[action.id]
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, stock: i.stock + inCart } : i)),
        cart,
      }
    }
    default:
      return state
  }
}

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => {
    const cartItems = state.items
      .filter((i) => state.cart[i.id])
      .map((i) => ({ ...i, quantity: state.cart[i.id] }))
    return {
      items: state.items,
      cartItems,
      cartCount: cartItems.reduce((n, i) => n + i.quantity, 0),
      cartTotal: cartItems.reduce((n, i) => n + i.quantity * i.price, 0),
      addItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
      addToCart: (id, qty = 1) => dispatch({ type: 'CART_INC', id, qty }),
      decreaseFromCart: (id) => dispatch({ type: 'CART_DEC', id }),
      removeFromCart: (id) => dispatch({ type: 'CART_REMOVE', id }),
    }
  }, [state])

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory debe usarse dentro de InventoryProvider')
  return ctx
}

export const formatCLP = (n) => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
