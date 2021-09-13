import logo from '../images/logo.png';
import { useContext } from 'react';
import { GlobalContext } from '../App';
import { useHistory } from 'react-router-dom';

export default function Header() {

    const { logOut } = useContext(GlobalContext);

    const history = useHistory();

    const navigate = e => {
        e.preventDefault();
        history.push(e.target.pathname);
    }

    return (
        <header className="page-header header container-fluid d-flex justify-content-between">
            <a href="/" onClick={navigate}>
                <img id="logo" src={logo} onClick={() => history.push('/')} alt="Acceder a la página principal" title="Acceder a la página principal" />
            </a>
            <div className="align-self-center">
                <button className="btn btn-dark" onClick={logOut}>Cerrar&nbsp;sesión</button>
            </div>
        </header>
    )
}