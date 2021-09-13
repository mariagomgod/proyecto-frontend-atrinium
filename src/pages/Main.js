import { useHistory } from "react-router-dom"

export default function Main () {
  const navigate = e => {
    e.preventDefault()
    history.push(e.target.pathname)
  }

  const history = useHistory()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
            <li className="nav-item d-block">
              <a className="nav-link" href="/empresas" onClick={navigate}>
                Ver&nbsp;todas&nbsp;las&nbsp;empresas
              </a>
            </li>
            <li className="nav-item d-block">
              <a className="nav-link" href="/sectores" onClick={navigate}>
                Ver&nbsp;todos&nbsp;los&nbsp;sectores
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
