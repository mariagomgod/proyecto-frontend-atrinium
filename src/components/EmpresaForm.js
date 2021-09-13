
export default function EmpresaForm({ onSubmit, empresa, setEmpresa }) {

    function updateField(e, field) {
        const input = e.target.value;
        setEmpresa(currentEmpresa => {
            const newEmpresa = { ...currentEmpresa };
            newEmpresa[field] = input;
            return newEmpresa;
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-section">
                <h5>Los campos marcados con * son obligatorios</h5>
                <div className="form-group">
                    <div className="control">
                        <label htmlFor="name">Nombre&nbsp;*</label>
                        <input type="text" className="form-control" id="name" placeholder="Introduzca el nombre" maxLenght="200" defaultValue={empresa.nombre} required onInput={e => updateField(e, "nombre")}></input>
                    </div>
                    <div className="control">
                        <label htmlFor="telephone">Teléfono&nbsp;*</label>
                        <input type="text" className="form-control" id="telephone" placeholder="Introduzca el teléfono" maxLenght="20" defaultValue={empresa.telefono} required onInput={e => updateField(e, "telefono")}></input>
                    </div>
                    <div className="control">
                        <label htmlFor="email">E-mail&nbsp;*</label>
                        <input type="email" className="form-control" id="email" placeholder="Introduzca el e-mail" maxLenght="100" defaultValue={empresa.email} required onInput={e => updateField(e, "email")}></input>
                    </div>
                    <div className="control">
                        <label htmlFor="sector">Sector&nbsp;*</label>
                        <input type="text" className="form-control" id="sector" placeholder="Introduzca el sector" maxLenght="20" defaultValue={empresa.sector} required onInput={e => updateField(e, "sector")}></input>
                    </div>
                </div>
            </div>
            <button type="submit" className="button">Enviar</button>
        </form>
    )
}
