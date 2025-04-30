import { Divider, Layout } from "antd"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import AdminTabs from "./components/AdminTabs.jsx"
import { Route, Routes } from "react-router-dom"
import AddProduct from "./pages/AddProduct.jsx"
import ListProducts from "./pages/ListProducts.jsx"
import Orders from "./pages/Orders.jsx"

function App() {

  return (
    <Layout>
      <div className="px-2 sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
        <Navbar />
        <Divider variant="solid" style={{ borderWidth: 1 }} />
        <div style={{ display: 'flex' }}>
            <AdminTabs />
            <div style={{ flex: 1, paddingLeft: 24 }}>
              <Routes>
                <Route path="/add" element={<AddProduct />} />
                <Route path="/list" element={<ListProducts />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        <Footer />
      </div>
    </Layout>
  )
}

export default App
