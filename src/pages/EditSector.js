import { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../config/config";
import SectorForm from '../components/SectorForm';
import { useHistory, useParams } from 'react-router-dom';

export default function EditSector() {

    const [sector, setSector] = useState({});

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        fetch(`${BASE_API_URL}/sectores/${id}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => setSector(data));
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    }, [history, id]);

    const submit = e => {

        e.preventDefault();

        fetch(
            `${BASE_API_URL}/sectores/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(sector),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            if (response.ok) {
                NotificationManager.success("Sector modificado con éxito", "Éxito", 1000);
                setTimeout(() => history.goBack(), 1000);
            } else if (response.status === 409) {
                NotificationManager.warning("El sector ya existe", "Advertencia", 1000);
            } else if (response.status >= 400 && response.status < 500) {
                NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 1000);
            } else {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            }
        })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
        });
    }

    return (
        <div>
            <NotificationContainer />

            <h2>Editar sector</h2>
            <SectorForm onSubmit={submit} sector={sector} setSector={setSector} />
        </div>);
}
