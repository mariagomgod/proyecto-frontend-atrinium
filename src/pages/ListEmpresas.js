import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useState, useEffect, useCallback } from 'react';
import { BASE_API_URL } from "../config/config";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default function ListEmpresas() {

    const [result, setResult] = useState([]);

    const history = useHistory();

    const fetchNextPage = useCallback(pageNumber => {
        fetch(`${BASE_API_URL}/empresas?page=${pageNumber}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(setResult);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
        }, []
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
                    remove(parseInt(id));
                }
            })
    }

    const remove = id => {
        fetch(`${BASE_API_URL}/empresas/${id}`)
            .then(response => {
                if (response.ok) {
                    setResult(currentResult => {
                        const newPageResults = currentResult.pageResults.filter(element => element.id !== id);
                        const newResult = {...currentResult};
                        newResult.pageResults = newPageResults;
                        return newResult;
                    });
                    NotificationManager.success("Empresa eliminada con éxito", "Eliminada", 1000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            })
            .catch(() => {
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
    };

    const openNewForm = e => {
        e.preventDefault();
        history.push('/empresas/new');
    }

    return (
        <div>
            <NotificationContainer />

            <h2>Empresas existentes</h2>
            <div className="table-responsive">
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Sector</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.pageResults?.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{element.nombre}</th>
                                    <td>{element.telefono}</td>
                                    <td>{element.email}</td>
                                    <td>{element.sector.nombre}</td>
                                    <td>
                                        <button className="btn btn-primary" id={element.id} value="Editar" onClick={showDetails}>Editar</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" id={element.id} value="Eliminar" onClick={showRemoveModal}>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary self-align-center" onClick={openNewForm}>Crear&nbsp;nueva&nbsp;empresa</button>
                <nav>
                    <ReactPaginate
                            containerClassName="pagination mb-0"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            pageCount={result.totalPages}
                            page RangeDisplayed="5"
                            marginPagesDisplayed="2"
                            onPageChange={selectedItem => fetchNextPage(selectedItem.selected + 1)}
                    />
                </nav>
            </div>
        </div>
    )
}
