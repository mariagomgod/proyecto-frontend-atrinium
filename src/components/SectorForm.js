
export default function SectorForm({ onSubmit, sector, setSector }) {

    function updateNombre(e) {
        const input = e.target.value;
        setSector({ nombre: input });
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h5>Los campos marcados con * son obligatorios</h5>
                <div>
                    <div>
                        <label htmlFor="name">Nombre&nbsp;*</label>
                        <input type="text" id="name" placeholder="Introduzca el nombre" maxLenght="200" defaultValue={sector.nombre} required onInput={updateNombre}></input>
                    </div>
                </div>
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}
