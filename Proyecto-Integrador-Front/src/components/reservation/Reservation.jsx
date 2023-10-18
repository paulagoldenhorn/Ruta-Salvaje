import { useNavigate, useLocation } from 'react-router-dom';
//import Styles from "./Reservation.modules.css";
import Styles from "./Reservation.module.css"
import { useState, useContext } from 'react';
import { DateObject } from "react-multi-date-picker"
import { UserContext } from '../../context/userContext';
import { VscError } from 'react-icons/vsc';
import "animate.css";

const Reservation = () => {
    const location = useLocation();
    const receivedData = location.state;

    const navigate = useNavigate();

    const [nameError, setNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    const [loading, setLoading] = useState(false)

    const userValues = useContext(UserContext)
    const token = userValues.jwtCode

    const [name, setName] = useState(userValues.user.name)
    const [lastName, setLastName] = useState(userValues.user.lastname)
    const [email, setEmail] = useState(userValues.user.email)

    const [finalPrice, setFinalPrice] = useState(receivedData.totalPrice)

    const handleNameChange = (e) => {
        setNameError(false);
        setName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastNameError(false);
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmailError(false);
        setEmail(e.target.value);
    }

    const validateData = () => {
        name.trim().length < 4 ? setNameError(true) : setNameError(false)
        lastName.trim().length < 4 ? setLastNameError(true) : setLastNameError(false)
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError(false)
        } else {
            setEmailError(true)
        }
        if (name.trim().length < 4 || lastName.trim().length < 4 || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
            return false
        }
        return true
    }

    const handleNavigateToUserHistory = () => {
        navigate('/user/history', { state: { personas: receivedData.people } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (validateData() === false) {
            setLoading(false)
        } else {
            const reservationData = {
                start_date: receivedData.dates.beggining,
                end_date: receivedData.dates.ending,
                product: {
                    id: receivedData.productInfo.id
                },
                price: finalPrice
            }

            const url = 'http://184.73.112.5:8080/reservation'
            const settings = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationData)
            }
            fetch(url, settings)
                .then((response) => {
                    if (response.status === 201) {
                        console.log(reservationData);
                        navigate('/reservation/success')
                    } else {
                        setLoading(false)
                        setFetchError(true)
                        console.log(reservationData);
                    }
                })
        }

    }

    const DiscountComponent = ({ code }) => {
        if (code === 'DORIAN') {
            setFinalPrice(receivedData.totalPrice - (receivedData.totalPrice * 0.30))
            return (
                <div className={Styles.detailInfo}>
                    <p className={Styles.detailName}>Código {code}</p>
                    <p className={Styles.detailDiscount}>-{0.30 * 100}%</p>
                </div>
            )
        }
        if (code === 'EQUIPO1') {
            setFinalPrice(receivedData.totalPrice - (receivedData.totalPrice * 0.50))
            return (
                <div className={Styles.detailInfo}>
                    <p className={Styles.detailName}>Código {code}</p>
                    <p className={Styles.detailDiscount}>-{0.50 * 100}%</p>
                </div>
            )
        }
        if (code === 'CAMADA10') {
            setFinalPrice(receivedData.totalPrice - (receivedData.totalPrice * 0.20))
            return (
                <div className={Styles.detailInfo}>
                    <p className={Styles.detailName}>Código {code}</p>
                    <p className={Styles.detailDiscount}>-{0.20 * 100}%</p>
                </div>
            )
        }
        return (undefined)
    }



    return (
        <section className={Styles.reservationSection}>
            <div>
                <p className={Styles.reservationTitle}>Finalizar Reserva</p>
            </div>
            <div className={Styles.container}>
                <p className={Styles.reservationData}>Información de la reserva</p>
                <div className={Styles.boxReservation}>
                    <div className={Styles.productData}>
                        <div>
                            <img className={Styles.imagePrev} src={receivedData.productInfo.mainImage.src} alt={receivedData.productInfo.mainImage.alt} />
                        </div>
                        <div>
                            <p className={Styles.productImportantData}>{receivedData.productInfo.name}</p>
                            <p className={Styles.productPlace}>Lujan de cuyo</p>
                        </div>
                    </div>
                    <div className={Styles.otherReservationInfo}>
                        <p className={Styles.subtitle}>Fechas</p>
                        <p className={Styles.productImportantData}>{receivedData.datesInfo.initialDate} - {receivedData.datesInfo.endDate}</p>
                    </div>
                    <div className={Styles.otherReservationInfo}>
                        <p className={Styles.subtitle}>Personas</p>
                        <p className={Styles.productImportantData}>{receivedData.people} {receivedData.people > 1 ? 'Adultos' : 'Adulto'}</p>
                    </div>
                </div>
            </div>
            <div className={Styles.container}>
                <p className={Styles.reservationData}>Detalles de contacto</p>
                <form className={Styles.formReservation}>
                    <div className={Styles.nameLastName}>
                        <div className={Styles.inputBox}>
                            <label className={Styles.labelReservation} htmlFor="name">Nombre</label>
                            <input type="text" className={nameError ? `${Styles.errorBorder}` : `${Styles.noError}`} placeholder='Ingresar nombre' value={name} onChange={handleNameChange} />
                            {nameError ? <p className={Styles.errorMsg}>Ingrese un nombre con mas de 3 caracteres</p> : undefined}
                        </div>
                        <div className={Styles.inputBox}>
                            <label className={Styles.labelReservation} htmlFor="lastName">Apellido</label>
                            <input type="text" className={lastNameError ? `${Styles.errorBorder}` : `${Styles.noError}`} placeholder='Ingresar apellido' value={lastName} onChange={handleLastNameChange} />
                            {lastNameError ? <p className={Styles.errorMsg}>Ingrese un apellido con mas de 3 caracteres</p> : undefined}
                        </div>
                    </div>
                    <div className={Styles.inputBox}>
                        <label className={Styles.labelReservation} htmlFor="email">Correo electrónico</label>
                        <input type="email" className={emailError ? `${Styles.errorBorder}` : `${Styles.noError}`} placeholder='Ingresar correo electronico' value={email} onChange={handleEmailChange} />
                        {emailError ? <p className={Styles.errorMsg}>Ingrese un email valido</p> : undefined}
                    </div>
                </form>
            </div>
            <div className={Styles.container}>
                <p className={Styles.reservationData}>Detalles de Compra</p>
                <div className={Styles.detailInfo}>
                    <p className={Styles.detailName}>Precio</p>
                    <p className={Styles.detailNumber}>${receivedData.totalPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</p>
                </div>
                <DiscountComponent code={receivedData.discount} />
                <div className={Styles.separation}></div>
                <div className={Styles.detailInfo}>
                    <p className={Styles.totalPrice}>Precio Total</p>
                    <p className={Styles.detailTotalPrice}>${(parseFloat(finalPrice).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</p>
                </div>
            </div>
            {
                !fetchError ? (!loading ? <button className={Styles.reservationButton} onClick={(e) => handleSubmit(e)}>Hacer Reserva</button> : <div className={Styles.loaderBox}><div className={Styles.loader}></div></div>) : <div className={`${Styles.fetchError} animate__animated animate__fadeIn`}> <VscError className={Styles.errorIcon} /> <p>Ocurrio un error, intente mas tarde</p> </div>
            }
        </section>
    )
}

export default Reservation