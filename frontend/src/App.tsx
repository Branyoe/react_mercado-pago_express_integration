import { initMercadoPago } from '@mercadopago/sdk-react'

import Product from "./components/Product/Product"

function App() {
  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY || '', {
    locale: 'es-MX'
  })
  

  return (
    <div>
      <h1>
        React.js and Mercado Pago Checkout Bricks integration
      </h1>
      <Product/>
    </div>
  )
}

export default App
