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
            <div>
                <h5>Los campos marcados con * son obligatorios</h5>
                <div>
                    <div>
                        <label htmlFor="name">Nombre&nbsp;*</label>
                        <input type="text" id="name" placeholder="Introduzca el nombre" maxlenght="200" defaultValue={sector.nombre} required onInput={updateNombre}></input>
                    </div>
                </div>
            </div>
            <button type="submit">Enviar</button>
            <button onClick={goBack}>Cancelar</button>
        </form>
    )
}
