import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useState, useEffect, useContext, useCallback } from 'react';
import { BASE_API_URL } from "../config/config";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalContext } from '../App';
import ReactPaginate from 'react-paginate';

export default function ListEmpresas() {

    const [result, setResult] = useState([]);

    const history = useHistory();

    const { logOut } = useContext(GlobalContext);

    const fetchNextPage = useCallback(pageNumber => {
        fetch(`${BASE_API_URL}/empresas?page=${pageNumber}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(setResult);
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
        }, [logOut]
    );

    useEffect(() => fetchNextPage(1), [fetchNextPage]);

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
            .then(modalResult => {
                if (modalResult.isConfirmed) {
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
                    setResult(currentResult => {
                        const newPageResults = currentResult.pageResults.filter(element => element.id !== id);
                        const newResult = {...currentResult};
                        newResult.pageResults = newPageResults;
                        return newResult;
                    });
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
        <div>
            <NotificationContainer />

            <h2>Empresas existentes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>E-mail</th>
                        <th>Sector</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {result.pageResults?.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.nombre}</td>
                                <td>{element.telefono}</td>
                                <td>{element.email}</td>
                                <td>{element.sector.nombre}</td>
                                <td>
                                    <button id={element.id} value="Editar" onClick={showDetails}>Editar</button>
                                </td>
                                <td>
                                    <button id={element.id} value="Eliminar" onClick={showRemoveModal}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ReactPaginate
                    pageCount={result.totalPages}
                    pageRangeDisplayed="5"
                    marginPagesDisplayed="2"
                    onPageChange={selectedItem => fetchNextPage(selectedItem.selected + 1)}
            />
        </div>
    )
}
