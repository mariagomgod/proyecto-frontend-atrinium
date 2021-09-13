import { useContext } from 'react';
import { GlobalContext } from '../App';
import BurgerMenu from './BurgerMenu';

export default function Header() {

    const { logOut } = useContext(GlobalContext);

    return (
        <div id="header">
            <div>
                <button onClick={logOut}>Cerrar&nbsp;sesión</button>
            </div>
            <div>
                <BurgerMenu />
            </div>
        </div>
    )
}