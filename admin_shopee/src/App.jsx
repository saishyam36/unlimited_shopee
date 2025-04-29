import { Layout } from "antd"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

function App() {

  return (
    <Layout>
      <div className="px-4 sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">

        <Navbar />

        <Footer />

      </div>

    </Layout>
  )
}

export default App
