import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './Login.css';
import { BASE_API_URL } from '../config/config';

export default function Login() {

    const [loginForm, setLoginForm] = useState({});

    const login = e => {
        e.preventDefault();

        fetch(`${BASE_API_URL}/login`,
            {
                method: 'POST',
                body: JSON.stringify(loginForm),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            if (response.ok) {
                response.json()
                    .then(data => localStorage.setItem("token", data.token));
            } else {
                if (response.status === 401) {
                    NotificationManager.warning("Email o contraseña erróneos", "Advertencia", 1000);
                } else {
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
            }
        }).catch(() => {
            NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
        });
    };

    const handleInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        setLoginForm(currentLoginForm => {
            const newLoginForm = { ...currentLoginForm };
            newLoginForm[field] = value;
            return newLoginForm;
        });
    };

    return (
        <div>
            <NotificationContainer />
            <div>
                <h2>Iniciar&nbsp;sesión</h2>

                <form onSubmit={login}>

                    <div id="loginInputs">
                        <div>
                            <label htmlFor="emailInput">Email&nbsp;*</label>
                            <input required type="email" name="email" placeholder="Introduce tu Email" maxLength="100" onInput={handleInput}></input>
                        </div>

                        <div>
                            <label htmlFor="passwordInput">Contraseña&nbsp;*</label>
                            <input required type="password" name="password" placeholder="********" maxLength="50" onInput={handleInput}></input>
                        </div>
                    </div>

                    <div>
                        <button type="submit">Iniciar&nbsp;sesión</button>
                    </div>
                </form>
            </div>
        </div>
    )
}