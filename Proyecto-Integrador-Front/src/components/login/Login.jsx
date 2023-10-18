/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FiAlertCircle } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';
import { ImNotification } from 'react-icons/im';
import { UserContext } from '../../context/userContext';
import './Login.css';

function Login() {
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { loginMessage, updateLoginMessageState, productId } = useContext(UserContext);

    useEffect(() => {
    }, [])

    const [isCapsLockOn, setIsCapsLockOn] = useState(false);

    const checkCapsLock = (event) => {
        if (event.getModifierState('CapsLock')) {
            setIsCapsLockOn(true);
        } else {
            setIsCapsLockOn(false);
        }
    };

    const [counter, setCounter] = useState(0)

    const [authError, setAuthError] = useState("");
    const [responseError, setResponseError] = useState(false)
    const navigate = useNavigate();


    const validateLoginForm = () => {
        const errors = [];

        if (user.email.trim() === '') {
            errors.push('El correo electrónico es obligatorio');
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.push('El correo electrónico es inválido');
        }

        if (user.password.trim() === '') {
            errors.push('No olvides ingresar tu contraseña');
        } else if (user.password.length < 4 || user.password.length > 15) {
            errors.push('La contraseña debe contener entre 4 y 15 caracteres');
        }
        setErrors(errors);
        return errors.length === 0;
    };


    const url = "http://184.73.112.5:8080/auth/authenticate"
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            setCounter(1)
            fetch(url, settings)
                .then((response) => {
                    if (response.status === 200) {
                        setTimeout(() => {
                            if (loginMessage) {
                                navigate(`/detail/${productId}`)
                                window.location.reload()
                                setCounter(0)
                            } else {
                                navigate("/")
                                window.location.reload()
                                setCounter(0)
                            }
                        }, 2000);

                        const emailParts = user.email.split('@');
                        const userName = emailParts[0];
                        toast.success(`Hola de nuevo, ${userName}!!`, {
                            icon: '👏',
                            duration: 2000,
                        });

                        updateLoginMessageState(false)
                    }
                    if (response.status === 401) {
                        setResponseError(true)
                        setAuthError("Credenciales inválidas");
                        setCounter(0)
                    } if (response.status === 403) {
                        setResponseError(true)
                        setAuthError("Usuario o contraseña no válido");
                        setCounter(0)
                    } if (response.status === 404) {
                        setResponseError(true)
                        setAuthError("Usuario no encontrado");
                        setCounter(0)
                    }
                    return response.json()

                })
                .then(function (data) {
                    if (data.token != null) {
                        sessionStorage.setItem("token", data.token)
                    }
                }
                )
        }
    }

    const handleMailChange = (e) => {
        setResponseError(false)
        setErrors([])
        setUser({ ...user, email: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setResponseError(false)
        setErrors([])
        setUser({ ...user, password: e.target.value })
    }

    return (
        <div className="login-container">
            <div className="form-container-login">
                <div className={`loginRequired ${loginMessage ? 'showMessage' : 'hideMessage'}`}>
                    <p> <ImNotification className='notificacionIcon' /> El inicio de sesión es obligatorio para acceder a nuestros servicios. Si aún no tienes una cuenta, te invitamos a <Link to="/register" className='registerMsg'><strong>registrarte</strong></Link> para disfrutar de todas nuestras funcionalidades</p>
                </div>
                <h4>Iniciar sesión</h4>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onKeyUp={checkCapsLock}
                        placeholder="Ingresar correo electrónico"
                        required
                        value={user.email}
                        onChange={(e) => handleMailChange(e)}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onKeyUp={checkCapsLock}
                        placeholder="Ingresar contraseña"
                        required
                        value={user.password}
                        onChange={(e) => handlePasswordChange(e)}
                    />
                    <div className="forgot-password">
                        <a href="/recover-password" className="plain-link">
                            <strong>¿Olvidaste tu contraseña?</strong>
                        </a>
                    </div>
                    {
                        errors.length > 0 ? (errors.map(error => <div className='boxError' key={error}><p>{error}</p></div>)) : undefined
                    }
                    {
                        responseError ? <div className='boxError'><p>{authError}</p></div> : undefined
                    }
                    {
                        isCapsLockOn ? <div className='boxErrorMayus'><FiAlertCircle className='iconBoxErrorMayus' /><p>Mayuscula activada</p></div> : undefined
                    }

                    <button
                        type="submit"
                        className="custom-link centered-button"
                        onClick={handleLogin}
                        disabled={counter === 1} // Deshabilita el botón cuando counter es igual a 1
                    >
                        {counter === 0 ? "Iniciar sesión" : "Aguarde mientras validamos su información."}
                    </button>
                </form>
                <button className="custom-link-reversed google-login">
                    <a href="https://accounts.google.com/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Iniciar sesión con Google
                    </a>
                </button>
                <div className="register-now">
                    ¿No tenés una cuenta? <Link to="/register" className="plain-link"><strong>Regístrate ahora</strong></Link>
                </div>
            </div>

            <div className="image-container-login">
                {/* colocar la imagen desde el bucket */}
                <img className='imgRegister' src="/images/login.jpg" alt="Imagen de inicio de sesión" />
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    );
}
export default Login;