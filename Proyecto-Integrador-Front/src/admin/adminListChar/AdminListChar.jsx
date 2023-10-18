import { RiDeleteBin5Line, RiAddCircleFill } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { DynamicIcon } from '../adminRegisterProducts/DynamicIcon';
import 'react-loading-skeleton/dist/skeleton.css';
import './AdminListChar.css';

export const AdminListChar = () => {
    const userValues = useContext(UserContext)
    const token = userValues.jwtCode
    const [loading, setLoading] = useState(true);
    const [features, setFeatures] = useState([])
    const numItems = 10

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            fetch(`http://184.73.112.5:8080/feature/all`)
                .then(response => response.json())
                .then(data => {
                    setFeatures(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching features:", error);
                    setLoading(false);
                });
        };
        fetchData();
    }, []);


    const handleDeleteClick = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#918f8e',
            cancelButtonColor: '#525050',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://184.73.112.5:8080/feature/${id}`
                const settings = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                fetch(url,settings)
                .then(response => console.log(response.status))                
                Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
            }
        });
    };
    
    return (
        <div className='listProductsAdmin'>
            <p>
                Administracion &gt; Caracteristicas &gt; <span className='spanAdminList'>ver caracteristicas</span>
            </p>
            <h3>Caracteristicas agregadas</h3>
            <div>
                {loading || !features ? (
                    <div>
                        {[...Array(numItems)].map((_, index) => (
                            <div className='AdminCardItem' key={index}>
                                <Skeleton height={50} width={50} circle={true} />
                                <div className='orderTitleCardArminChar'>
                                    <Skeleton height={20} width={45} />
                                    <Skeleton height={20} width={150} />
                                    <Skeleton height={20} width={220} />
                                </div>
                                <div className='orderAdminButtonPro'>
                                    <Skeleton height={40} width={95} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                                    <Skeleton height={40} width={95} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    features?.map((feature) => (
                        <div className='AdminCardItem' key={feature.id}>
                            <div className='AdminCardItemImgChar'>
                                <DynamicIcon name={feature.icon} />
                            </div>
                            <div className='orderTitleCardArminChar'>
                                <h4><span className='spanAdminList2'>id:</span> #{feature.id}</h4>
                                <h4><span className='spanAdminList2'>característica:</span> {feature.name}</h4>
                                <h4>
                                    <span className='spanAdminList2'>Aventuras asociadas:</span> ({features.lenght || 0})
                                </h4>
                            </div>
                            <div className='orderAdminButtonPro'>
                                <Link className="Btn" to={`/administracion/caracteristicas/editar_caracteristica/${feature.id}`}>editar
                                    <MdOutlineEdit className="svg" />
                                </Link>
                                <button className="Btn" onClick={() => handleDeleteClick(feature.id)}>
                                    borrar
                                    <RiDeleteBin5Line className="svg" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className='orderAddBtnAddm'>
                <Link to="/administracion/nueva_caracteristica" className="buttonAddListAdd">
                    <RiAddCircleFill className="svgIcon" />
                </Link>
            </div>
        </div>
    )
}