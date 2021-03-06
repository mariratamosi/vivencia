// https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene

import "./App.css"
import FireWorks from "./modules/fireWorks"
import InfiniteDot from "./modules/infinityDot"
import ModelChair from "./three/Chairs/ModelChair"
import Navbar from "./Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BreathingDots from "./three/breathing-dot"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<FireWorks />} />
          <Route path="/infinity" element={<InfiniteDot />} />
          <Route path="/breathing-dot" element={<BreathingDots />} />
          <Route path="/three-chair" element={<ModelChair />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
