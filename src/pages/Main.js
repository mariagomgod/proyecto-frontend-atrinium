import { useHistory } from 'react-router-dom';

export default function Main() {

    const navigate = e => {
        e.preventDefault();
        history.push(e.target.pathname);
    }

    const history = useHistory();

    return (
        <>
            <a href="/empresas" onClick={navigate}>Ver&nbsp;todas&nbsp;las&nbsp;empresas</a>
            <a href="/sectores" onClick={navigate}>Ver&nbsp;todos&nbsp;los&nbsp;sectores</a>
        </>
    )
}
