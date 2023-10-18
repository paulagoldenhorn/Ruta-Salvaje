/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from "react-router-dom";
import "animate.css";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(200)
    const [registerSucceed, setRegisterSucceed] = useState(false)
    const [reSendMail, setReSendMail] = useState(false)

    const handleResend = (e) => {
        e.preventDefault()
        const url2 = "http://184.73.112.5:8080/registerConfirm"
        const settings2 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }
        fetch(url2, settings2)
            .then(function (response) {

            })
        if (!reSendMail) {
            setReSendMail(true)
        }
    }
    const DynamicLetter = ({ status }) => {
        if (status === 200) {

            return (
                <div className='succeedBox animate__animated animate__fadeIn'>
                    <p className='succeedText'>Registro correcto! Se envio la confirmacion al mail registrado</p>
                    {
                        !reSendMail ? <button className='succeedButton noNeed' onClick={handleResend}>Reenviar mail de confirmacion </button> : <button className='succeedButton mailSended animate__animated animate__fadeIn'>Mail reenviado!</button>
                    }
                </div>
            );
        }
        if (status === 400) {
            return (
                <div className='boxError'>
                    <p>Ya existe un usuario con ese nombre</p>
                </div>
            );
        }
        if (status != 0 && status != 200 && status != 400) {
            return (
                <div className='boxError'>
                    <p>Ocurrio un error, intente mas tarde</p>
                </div>
            );
        }
    }
    const role = "BASIC"
    const user = {
        name,
        lastname,
        email,
        password,
        role
    }

    const url = "http://184.73.112.5:8080/auth/register"
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const validationErrors = registerValidation(name, lastname, email, password, confirmPassword);

        if (Object.keys(validationErrors).length === 0) {
            const button = document.querySelector("#buttonid");
            button.setAttribute("disabled", "true");
            setErrors({});
            fetch(url, settings)
                .then(function (response) {
                    setStatus(response.status);
                    setRegisterSucceed(true);
                    return response.json();
                });
        } else {
            setErrors(validationErrors);
        }
    };

    const handleNameChange = (e) => {
        if (errors[name] !== '') {
            setErrors(current => {
                const { name, ...rest } = current;
                return rest;
            })
        }
        setName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        if (errors[lastname] !== '') {
            setErrors(current => {
                const { lastname, ...rest } = current;
                return rest;
            })
        }
        setLastname(e.target.value)
    }

    const handleMailChange = (e) => {
        if (errors[email] !== '') {
            setErrors(current => {
                const { email, ...rest } = current;
                return rest;
            })
        }
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        if (errors[password] !== '') {
            setErrors(current => {
                const { password, ...rest } = current;
                return rest;
            })
        }
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        if (errors[confirmPassword] !== '') {
            setErrors(current => {
                const { confirmPassword, ...rest } = current;
                return rest;
            })
        }
        setConfirmPassword(e.target.value)
    }

    return (
        <div className="register-container">
            <div className="form-container-register">
                <h4>Crea tu cuenta</h4>
                <form onSubmit={handleRegister}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ingresar nombre"
                        required
                        value={name}
                        onChange={(e) => handleNameChange(e)}
                    />
                    <label htmlFor="lastname">Apellido</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Ingresar apellido"
                        required
                        value={lastname}
                        onChange={(e) => handleLastNameChange(e)}
                    />
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresar correo electrónico"
                        required
                        value={email}
                        onChange={handleMailChange}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresar contraseña"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div className="confirm-password-container">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {Object.keys(errors).length > 0 && (
                        <ul className="boxError">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}

                    {
                        !registerSucceed ? <button id="buttonid" type="submit" className="custom-link centered-button"> Registrarme </button> : <div><DynamicLetter status={status} /></div>
                    }

                </form>
                {
                    !registerSucceed ? <button className="custom-link-reversed google-register">
                        <a
                            href="https://accounts.google.com/login"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            Registrarme con Google
                        </a>
                    </button> : undefined
                }
                <div className="register-now">
                    ¿Tenés una cuenta?{" "}
                    <Link to="/login" className="plain-link">
                        <strong>Inicia sesión</strong>
                    </Link>
                </div>
            </div>
            <div className="image-container">
                <img src="images/register.jpg" alt="Imagen de inicio de sesión" />
            </div>
        </div>
    );
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function registerValidation(name, lastname, email, password, confirmPassword
) {
    const errors = {};

    if (name.trim() === '') {
        errors.name = 'El nombre es obligatorio';
    } else if (name.length < 2) {
        errors.name = ('El nombre debe contener al menos 2 caracteres');
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
        errors.name = 'El nombre solo debe contener letras y espacios';
    }
    if (lastname.trim() === '') {
        errors.lastname = 'El apellido es obligatorio';
    } else if (lastname.length < 2) {
        errors.lastname = 'El apellido debe contener al menos 2 caracteres';
    } else if (!/^[a-zA-Z\s]*$/.test(lastname)) {
        errors.lastname = 'El apellido solo debe contener letras y espacios';
    }
    if (!isValidEmail(email)) {
        errors.email = 'El correo electrónico es inválido';
    }
    if (password.trim() === '') {
        errors.password = 'No olvides ingresar tu contraseña';
    } else if (password.length < 4 || password.length > 15) {
        errors.password = 'La contraseña debe contener entre 4 y 15 caracteres';
    }
    if (password !== confirmPassword) {
        errors.confirmPassword = 'Las contraseñas deben coincidir';
    }
    return errors;
}
export default Register;