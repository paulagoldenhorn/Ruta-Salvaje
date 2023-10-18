import { useState, useContext } from 'react'
import Styles from './AdminRegisterChar.module.css'
import { LuFolderCheck } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";
import { DynamicIcon } from '../adminRegisterProducts/DynamicIcon';
import { UserContext } from '../../context/userContext';

export const AdminRegisterChar = () => {

    const userValues = useContext(UserContext)
    const token = userValues.jwtCode

    const [icon, setIcon] = useState('')
    const [service, setService] = useState('')
    const [responseStatus, setResponseStatus] = useState(0)
    const [loading, setLoading] = useState(false)

    const [iconError, setIconError] = useState('noError')
    const [serviceError, setServiceError] = useState('noError')
    const [error, setError] = useState(false)

    const handleIconChange = (e) => {
        setIconError('noError');
        setIcon(e.target.value)
    }

    const handleServiceChange = (e) => {
        setServiceError('noError')
        setService(e.target.value)
    }

    const validateData = () => {
        icon === '' || icon.length < 4 ? setIconError('error') : setIconError('noError')
        service === '' || service.length < 3 ? setServiceError('error') : setServiceError('noError')
    }

    const DynamicLetter = ({ status }) => {
        if (status === 201) {
            return <div className={`${Styles.success} animate__animated animate__fadeIn`}><LuFolderCheck className={Styles.iconSuccess} /></div>
        }
        if (status === 400) {
            return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ya existe una caracteristica con ese nombre</p></div>
        }
        if (status != 0 && status != 201 && status != 400) {
            return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ocurrio un error, intente mas tarde</p></div>
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        validateData()
        if (icon === '' || icon.length < 4 || service === '' || service.length < 3) {
            setError(true)
        }
        else {
            setLoading(true)
            const featureData = {
                name: service,
                icon: icon
            }

            const url = 'http://184.73.112.5:8080/feature'
            const settings = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(featureData)
            }

            fetch(url, settings)
                .then(response => {
                    setResponseStatus(response.status)
                    setLoading(false)
                })
        }
    }

    return (
        <div className='listProductsAdmin'>
            <p>
                Administracion &gt; Caracteristicas &gt; <span className='spanAdminList'>Agregar nueva</span>
            </p>
            <h3>Agregar nueva caracteristica</h3>
            <div className={Styles.registerFeatureContainer}>
                <form className={Styles.registerFeatureForm} type='submit'>
                    <div className={Styles.inputBox}>
                        <label htmlFor="iconName">Icono</label>
                        <div className={Styles.inputPreviewBox}>
                            <input type="text" value={icon} onChange={handleIconChange} placeholder='Ingrese nombre del icono' className={Styles[iconError]} />
                            {
                                icon.length > 4 ? <DynamicIcon name={icon} /> : <Skeleton width={30} height={30} className={Styles.skeletonBox} />
                            }
                        </div>
                        <p className={`${Styles.textError} ${iconError === 'error' ? Styles.showIcon : Styles.hideIcon}`}>Ingrese un nombre</p>
                    </div>
                    <div className={Styles.inputBox}>
                        <label htmlFor="serviceName">Servicio</label>
                        <input type="text" value={service} onChange={handleServiceChange} placeholder='Ingrese nombre del servicio' className={Styles[serviceError]} />
                        <p className={`${Styles.textError} ${serviceError === 'error' ? Styles.showService : Styles.hideService}`}>Ingrese un servicio</p>
                    </div>
                    {
                        responseStatus === 0 ? (<button className={Styles.addFeatureButton} onClick={handleSubmit}>
                            {
                                !loading ? 'Agregar' : <div className={Styles.loader}></div>
                            }
                        </button>) : <DynamicLetter status={responseStatus} />
                    }
                </form>
            </div>
        </div>
    )
}