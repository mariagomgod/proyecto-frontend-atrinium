import { useHistory } from 'react-router-dom';

export default function EmpresaForm({ onSubmit, empresa, setEmpresa }) {

    const history = useHistory();

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
            <div>
                <h5>Los campos marcados con * son obligatorios</h5>
                <div>
                    <div>
                        <label htmlFor="nombre">Nombre&nbsp;*</label>
                        <input type="text" id="nombre" placeholder="Introduzca el nombre" maxLenght="200" defaultValue={empresa.nombre} required onInput={updateField}></input>
                    </div>
                    <div>
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="text" id="telefono" placeholder="Introduzca el teléfono" maxLenght="20" defaultValue={empresa.telefono} onInput={updateField}></input>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="Introduzca el e-mail" maxLenght="100" defaultValue={empresa.email} onInput={updateField}></input>
                    </div>
                    <div>
                        <label htmlFor="sector">Sector&nbsp;*</label>
                        <input type="text" id="sector" placeholder="Introduzca el sector" maxLenght="20" defaultValue={empresa.sector} required onInput={updateField}></input>
                    </div>
                </div>
            </div>
            <button type="submit">Enviar</button>
            <button onClick={goBack}>Cancelar</button>
        </form>
    )
}
