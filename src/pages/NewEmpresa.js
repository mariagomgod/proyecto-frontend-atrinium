import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BASE_API_URL } from "../config/config";
import EmpresaForm from '../components/EmpresaForm';
import { useHistory } from 'react-router-dom';

export default function NewEmpresa() {

    const [empresa, setEmpresa] = useState({});
    const history = useHistory();

    function submit(e) {

        e.preventDefault();

        const form = e.target;

        fetch(
            `${BASE_API_URL}/empresas`,
            {
                method: 'POST',
                body: JSON.stringify(empresa),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            if (response.ok) {
                form.reset();
                NotificationManager.success("Empresa añadida con éxito.", "Éxito", 2000);
                setTimeout(() => history.goBack(), 2000);
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

            <h2>Nueva empresa</h2>
            <EmpresaForm onSubmit={submit} empresa={empresa} setEmpresa={setEmpresa} />
        </div>);
}