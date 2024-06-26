import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <h1 className="navbar-brand">The Muzak Player</h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{ color: "white" }}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to={"/"}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <Link className="nav-item nav-link" to={"/aboutMuzakPlayer"}>
            About This Project
          </Link>
          <Link className="nav-item nav-link" to={"/aboutKristen"}>
            About Kristen
          </Link>
          <a className="nav-item nav-link" href="https://kristenwegner.com/">
            Kristen's Portfolio
          </a>
          {/* <Link className="nav-item nav-link" to={'https://klwegner.github.io/kwegnerPortfolio/'}>Kristen's Portfolio</Link> */}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
