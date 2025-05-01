import { Divider, Layout } from "antd"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import AdminTabs from "./components/AdminTabs.jsx"
import { Route, Routes } from "react-router-dom"
import AddProduct from "./pages/AddProduct.jsx"
import ListProducts from "./pages/ListProducts.jsx"
import Orders from "./pages/Orders.jsx"
import { useEffect, useState } from "react"
import Login from "./components/Login.jsx"

export const apiUrl = 'http://localhost:4000/api'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    token === '' ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
        <Login setToken={setToken} />
      </div>
    ) : (
      <Layout>
        <div className="px-2 sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
          <Navbar setToken={setToken} />
          <Divider variant="solid" style={{ borderWidth: 1 }} />
          <div className="flex items-start flex-row w-full h-full">
            <AdminTabs />
            <div className="w-full h-full" style={{ flex: 1, paddingLeft: 24 }}>
              <Routes>
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListProducts token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    )
  )
}

export default App
