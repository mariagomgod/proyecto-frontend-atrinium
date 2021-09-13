import { useState, useEffect, useContext } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../config/config";
import SectorForm from '../components/SectorForm';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../App';

export default function EditSector() {

    const [sector, setSector] = useState({});

    const { id } = useParams();

    const history = useHistory();

    const { logOut } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`${BASE_API_URL}/sectores/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => setSector(data));
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
            `${BASE_API_URL}/sectores/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(sector),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then(response => {
            if (response.ok) {
                NotificationManager.success("Sector modificado con éxito", "Éxito", 1000);
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
        <div className="form-wrapper">
            <NotificationContainer />

            <h2>Editar sector</h2>
            <SectorForm onSubmit={submit} sector={sector} setSector={setSector} />
        </div>);
}
