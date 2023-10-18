import { useContext, useEffect, useState } from 'react'
import Styles from './adminEditChar.module.css'
import { LuFolderCheck } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import { DynamicIcon } from '../adminRegisterProducts/DynamicIcon';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";

export const AdminEditChar = () => {
    const { fid } = useParams();
    const [charData, setCharData] = useState({
        id: '',
        name: '',
        icon: ''
    })
    const userValues = useContext(UserContext)
    const token = userValues.jwtCode
    const [icon, setIcon] = useState(charData.icon)
    const [service, setService] = useState(charData.name)
    const [responseStatus, setResponseStatus] = useState(0)
    const [iconError, setIconError] = useState('noError')
    const [serviceError, setServiceError] = useState('noError')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dataFeatureFetch()
    }, [])

    const dataFeatureFetch = async () => {
        const response = await fetch(`http://184.73.112.5:8080/feature/${fid}`)
        const data = await response.json()
        setCharData(data)
        setIcon(data.icon);
        setService(data.name);
    }

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
    const DynamicLetter = () => {
        if (responseStatus === 202) {
            return <div className={`${Styles.success} animate__animated animate__fadeIn`}><LuFolderCheck className={Styles.iconSuccess} /></div>;
        }
        if (responseStatus === 400) {
            return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ya existe una característica con ese nombre</p></div>;
        }
        if (responseStatus !== 0 && responseStatus !== 202 && responseStatus !== 400) {
            return <div className={`${Styles.errorMessage} animate__animated animate__fadeIn`}><p>Ocurrió un error, intente más tarde</p></div>;
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        validateData()
        if (icon === '' || icon.length < 4 || service === '' || service.length < 3) {
            setError(true)
        }
        else {
            setLoading(true)
            let featureData = {
                id: charData.id,
                name: service,
                icon: icon,
            };
            const url = 'http://184.73.112.5:8080/feature'
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(featureData),
            }
            fetch(url, settings)
                .then(response => {
                    setResponseStatus(response.status)
                    setLoading(false)             
                })
            featureData = {
                id: charData.id,
                name: service,
                icon: icon,
            }
        }
    }

    return (
        <div className='listProductsAdmin'>
            <p>
                Administracion &gt; Caracteristicas &gt;{' '}
                <span className='spanAdminList'>editar Caracteristica</span>
                &gt;
                <span className='spanAdminList'>ID: {charData.id}</span>
            </p>
            <h3>Editar Caracteristica</h3>
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
                        responseStatus === 0 ? <button className={Styles.addFeatureButton} onClick={handleSubmit}>{
                            !loading? 'Actualizar' : <div className={Styles.loader}></div>
                        }</button> : <DynamicLetter />
                    }
                </form>
            </div>
        </div>
    )
}