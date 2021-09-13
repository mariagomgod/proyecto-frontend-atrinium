import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useState, useEffect, useContext } from 'react';
import { BASE_API_URL } from "../config/config";
import { useHistory } from 'react-router-dom';
import './ListEmpresas.css';
import Swal from 'sweetalert2';
import { GlobalContext } from '../App';

export default function ListEmpresas() {

    const [list, setList] = useState([]);

    const history = useHistory();

    const { logOut } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`${BASE_API_URL}/empresas`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => setList(data.pageResults));
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    }, [history, logOut]);

    const showDetails = e => {
        const id = e.target.id;
        history.push(`/empresas/edit/${id}`);
    };

    const showRemoveModal = e => {
        const id = e.target.id;
        Swal.fire({
            title: "Eliminar",
            html: "<p>¿Seguro que deseas eliminar esta empresa?</p>",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: false,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            customClass: {
                confirmButton: 'button',
                cancelButton: 'button'
            },
            focusConfirm: false,
            focusCancel: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    remove(id);
                }
            })
    }

    const remove = id => {
        fetch(`${BASE_API_URL}/empresas/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setList(currentList => currentList.filter(element => element.id !== id));
                    NotificationManager.success("Empresa eliminada con éxito", "Eliminada", 1000);
                } else if (response.status === 401) {
                    NotificationManager.warning("La sesión ha expirado. Redirigiendo a la página de inicio de sesión...", "Advertencia", 3000);
                    setTimeout(logOut, 3000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    };

    return (
        <div id="list">
            <NotificationContainer />

            <h2 className="title">Empresas existentes</h2>
            <table>
                <thead>
                    <tr>
                        <th className="name">Nombre</th>
                        <th className="telephone">Teléfono</th>
                        <th className="email">E-mail</th>
                        <th className="sector">Sector</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td className="name">{element.nombre}</td>
                                <td className="telephone">{element.telefono}</td>
                                <td className="email">{element.email}</td>
                                <td className="sector">{element.sector.nombre}</td>
                                <td className="action">
                                    <button className="button" id={element.id} value="Editar" onClick={showDetails}>Editar</button>
                                </td>
                                <td className="action">
                                    <button className="button" id={element.id} value="Eliminar" onClick={showRemoveModal}>Editar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
