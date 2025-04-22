// import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Collection from './pages/Collection.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Orders from './pages/Orders.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import SignUp from "./pages/SignUp.jsx"

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/create-account" element={<SignUp/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/product/:productID" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/place-order" element={<PlaceOrder/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App