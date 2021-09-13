import { useState, useEffect, useContext } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../config/config";
import EmpresaForm from '../components/EmpresaForm';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../App';

export default function EditEmpresa() {

    const [empresa, setEmpresa] = useState({});

    const { id } = useParams();

    const history = useHistory();

    const { logOut } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`${BASE_API_URL}/empresas/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => setEmpresa(data));
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else if (response.status === 403) {
                    history.push('/error');
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    }, [history, id, logOut]);

    const submit = e => {

        e.preventDefault();

        fetch(
            `${BASE_API_URL}/empresas/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(empresa),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then(response => {
            if (response.ok) {
                NotificationManager.success("Empresa modificada con éxito", "Éxito", 1000);
                setTimeout(() => history.goBack(), 1000);
            } else {
                    if (response.status === 401) {
                        NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                        setTimeout(logOut, 3000);
                    } else if (response.status >= 400 && response.status < 500) {
                        NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 1000);
                    } else {
                        NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                    }
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    }

    return (
        <div>
            <NotificationContainer />

            <h2>Editar empresa</h2>
            <EmpresaForm onSubmit={submit} empresa={empresa} setEmpresa={setEmpresa} />
        </div>);
}
