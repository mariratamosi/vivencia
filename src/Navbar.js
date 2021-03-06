import { Link } from "react-router-dom"
function Navbar() {
  return (
    <div className="Nav-container">
      <div>
        <Link to="/" className="Nav-options">
          Home
        </Link>
        <Link to="/infinity" className="Nav-options">
          Infinity
        </Link>
        {/* <Link to="/three-basic" className="Nav-options">
          Basic-three
        </Link> */}
        <Link to="/breathing-dot" className="Nav-options">
          Breathing dots
        </Link>
        <Link to="/three-chair" className="Nav-options">
          Three-chair
        </Link>
      </div>{" "}
      <div variant="h4" className="Nav-header">
        Vivencia
      </div>
    </div>
  )
}

export default Navbar
