import { useHistory } from 'react-router-dom';

export default function SectorForm({ onSubmit, sector, setSector }) {

    const history = useHistory();

    function updateNombre(e) {
        const input = e.target.value;
        setSector({ nombre: input });
    }

    const goBack = e => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <form onSubmit={onSubmit}>
            <h5>Los campos marcados con * son obligatorios</h5>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="nombre">Nombre&nbsp;*</label>
                <input type="text" className="form-control" id="nombre" placeholder="Introduzca el nombre" maxlenght="200" defaultValue={sector.nombre} required onInput={updateNombre}></input>
            </div>
            <div className="form-group mb-3">
                <button className="btn btn-primary" type="submit">Enviar</button>
                <button className="btn btn-secondary ms-2" onClick={goBack}>Cancelar</button>
            </div>
        </form>
    )
}
