import { Link } from "react-router-dom"
function Navbar() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/infinity">Infinity</Link>
      </div>{" "}
      <div variant="h4">Vivencia</div>
    </div>
  )
}

export default Navbar
