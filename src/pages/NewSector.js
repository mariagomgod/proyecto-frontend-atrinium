import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../config/config";
import SectorForm from '../components/SectorForm';
import { useHistory } from 'react-router-dom';

export default function NewSector() {

    const [sector, setSector] = useState({});
    const history = useHistory();

    function submit(e) {

        e.preventDefault();

        const form = e.target;

        fetch(
            `${BASE_API_URL}/sectores`,
            {
                method: 'POST',
                body: JSON.stringify(sector),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            if (response.ok) {
                form.reset();
                NotificationManager.success("Sector añadido con éxito.", "Éxito", 2000);
                setTimeout(() => history.goBack(), 2000);
            } else  if (response.status === 409) {
                NotificationManager.warning("El sector ya existe", "Advertencia", 1000);
            } else if (response.status >= 400 && response.status < 500) {
                NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 2000);
            } else {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 2000);
            }
        })
        .catch(() => {
            NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 2000);
        });
    }

    return (
        <div>
            <NotificationContainer />

            <h2>Nuevo sector</h2>
            <SectorForm onSubmit={submit} sector={sector} setSector={setSector} />
        </div>);
}