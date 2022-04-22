import "./App.css"
import FireWorks from "./modules/fireWorks"
import InfiniteDot from "./modules/infinityDot"
import Navbar from "./Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<FireWorks />} />
        <Route path="/infinity" element={<InfiniteDot />} />
      </Routes>
    </Router>
  )
}

export default App
