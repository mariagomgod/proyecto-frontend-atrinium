import logo from '../images/logo.png';
import { useHistory } from 'react-router-dom';

export default function Header() {

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
        </header>
    )
}