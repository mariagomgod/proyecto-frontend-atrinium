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
        <>
            <div>
                <a href="/" onClick={navigate}>
                    <img id="logo" src={logo} onClick={() => history.push('/')} alt="Acceder a la página principal" title="Acceder a la página principal" />
                </a>
            </div>
            <div>
                <button onClick={logOut}>Cerrar&nbsp;sesión</button>
            </div>
        </>
    )
}