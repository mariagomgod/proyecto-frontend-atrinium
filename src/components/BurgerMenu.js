import './BurgerMenu.sass';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

export default function BurgerMenu() {

    const toggleActive = () => {
        document.getElementById("myLinks").classList.toggle('active');
    };

    const show = () => {
        document.getElementById("myLinks").classList.add('active');
    };

    const hide = () => {
        document.getElementById("myLinks").classList.remove('active');
    };

    const navigate = e => {
        e.preventDefault();
        hide();
        history.push(e.target.pathname);
    }

    const history = useHistory();

    return (
        <div className="topnav" onMouseLeave={hide}>
            <button className="icon" onClick={toggleActive} onMouseEnter={show}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div id="myLinks">
                <a href="/login" onClick={navigate}>Iniciar&nbsp;sesión</a>
                <a href="/empresas" onClick={navigate}>Ver&nbsp;todas&nbsp;las&nbsp;empresas</a>
                <a href="/empresas/new" onClick={navigate}>Crear&nbsp;una&nbsp;empresa&nbsp;nueva</a>
                <a href="/sectores" onClick={navigate}>Ver&nbsp;todos&nbsp;los&nbsp;sectores</a>
                <a href="/sectores/new" onClick={navigate}>Crear&nbsp;un&nbsp;sector&nbsp;nuevo</a>
            </div>
        </div>
    )
}
