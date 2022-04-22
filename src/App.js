// https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene

import "./App.css"
import FireWorks from "./modules/fireWorks"
import InfiniteDot from "./modules/infinityDot"
import BasicThreeComp from "./three/basic"
import Navbar from "./Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<FireWorks />} />
          <Route path="/infinity" element={<InfiniteDot />} />
          <Route path="/three-basic" element={<BasicThreeComp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
