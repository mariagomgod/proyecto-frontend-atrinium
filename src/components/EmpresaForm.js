import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from "../config/config";

export default function EmpresaForm({ onSubmit, empresa, setEmpresa }) {

    const history = useHistory();

    const [sectores, setSectores] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/sectores?all=true`)
        .then(response => {
            if (response.ok) {
                response.json()
                   .then(data => {
                       setSectores(data.pageResults);
                       if (!empresa.sector) {
                           empresa.sector = data.pageResults[0].id;
                       }
                   });
            }
        });
    }, []);

    const updateField = e => {
        const field = e.target.id;
        const value = e.target.value;
        setEmpresa(currentEmpresa => {
            const newEmpresa = { ...currentEmpresa };
            newEmpresa[field] = value;
            return newEmpresa;
        });
    }

    const goBack = e => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <form onSubmit={onSubmit}>
            <h5>Los campos marcados con * son obligatorios</h5>
            <div className="form-group mb-3">
                <label htmlFor="nombre">Nombre&nbsp;*</label>
                <input className="form-control" type="text" id="nombre" placeholder="Introduzca el nombre" maxlenght="200" defaultValue={empresa.nombre} required onInput={updateField}></input>
            </div>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="telefono">Teléfono</label>
                <input className="form-control" type="text" id="telefono" placeholder="Introduzca el teléfono" maxlenght="20" defaultValue={empresa.telefono} onInput={updateField}></input>
            </div>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="email">E-mail</label>
                <input className="form-control" type="email" id="email" placeholder="Introduzca el e-mail" maxlenght="100" defaultValue={empresa.email} onInput={updateField}></input>
            </div>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="sector">Sector&nbsp;*</label>
                <select className="form-control" id="sector" value={empresa.sector?.id} required onInput={updateField}>
                {
                    sectores.map(sector =>
                        <option key={sector.id} value={sector.id}>{sector.nombre}</option>
                    )
                }
                </select>
            </div>
            <div className="form-group mb-3">
                <button className="btn btn-primary" type="submit">Enviar</button>
                <button className="btn btn-secondary ms-2" onClick={goBack}>Cancelar</button>
            </div>
        </form>
    )
}
