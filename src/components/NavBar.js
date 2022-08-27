import { Link } from 'react-router-dom';

function NavBar() {
    return(
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <h1 className="navbar-brand">The Muzak Player</h1>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link to={'/'} className="nav-item nav-link active">Home <span className="sr-only">(current)</span></Link>
      <Link to={'/aboutMuzakPlayer'} className="nav-item nav-link">About This Project</Link>
      <Link to={'/aboutKristen'} className="nav-item nav-link">About Kristen</Link>
      <Link to={'/'} className="nav-item nav-link disabled">Kristen's Portfolio</Link>
    </div>
  </div>
</nav> 
    )
}
export default NavBar;