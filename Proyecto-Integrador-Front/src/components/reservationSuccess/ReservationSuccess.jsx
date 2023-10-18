import Styles from './ReservationSuccess.module.css'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from "react-router-dom"
import "animate.css";

const ReservationSuccess = () => {

    return(
        <section className={`${Styles.successSection} animate__animated animate__fadeIn`}> 
                <p className={Styles.successSectionTitle}>¡Reserva exitosa!</p>
                <div className={Styles.descrBox}>
                    <p className={Styles.successSectionDescr}>Te hemos enviado un correo electrónico de confirmación que incluye toda la información necesaria para tu reserva.</p>
                </div>
                <div className={Styles.iconCheckBox}>
                    <AiOutlineCheckCircle className={Styles.iconCheck}/>
                </div>
                <div className={Styles.optionsContainer}>
                        <Link to="/" className={Styles.reservationOption}><div className={Styles.optionBox}>Volver a home</div></Link>
                        <Link to="/usuario/historial" className={Styles.reservationOption}><div className={Styles.optionBox}>Ver mis reservas</div></Link>
                </div>
        </section> 
    )
}
export default ReservationSuccess