import { RiDeleteBin5Line, RiAddCircleFill } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import 'react-loading-skeleton/dist/skeleton.css';
import './AdminListCategory.css'

export const AdminListCategory = () => {
    const userValues = useContext(UserContext)
    const token = userValues.jwtCode
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([])
    const numItems = 5
    const [categoryChanges, setCategoryChanges] = useState(0)
    

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            fetch(`http://184.73.112.5:8080/category/all`)
            .then(response => response.json())
                .then(data => {
                    setCategories(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching features:", error);
                    setLoading(false);
                });
        };
        fetchData();
    }, [categoryChanges]);

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer. Al borrar esta categoría, borrarás también los productos asociados',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#918f8e',
            cancelButtonColor: '#E95823',
            confirmButtonText: 'Sí, eliminar categoría y productos asociados',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {                
                const url = `http://184.73.112.5:8080/category/${id}`
                const settings = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                fetch(url,settings)
                .then(response => {
                    if(response.status==200){
                        
                        setCategoryChanges(categoryChanges+1)
                        Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');}
                })                
                
                
            }
        });
    };
    
    
    return (
        <div className='listProductsAdmin'>
            <p>
                Administracion &gt; Categorias&gt; <span className='spanAdminList'>ver categorias</span>
            </p>
            <h3>Categorias agregadas</h3>
            <div>
                {loading || !categories ? (
                    <div>
                    {[...Array(numItems)].map((_, index) => (
                        <div className='AdminCardItem' key={index}>
                            <Skeleton height={100} width={100} circle={true} />
                            <div className='divSke'>
                                <Skeleton height={100} width={730} style={{ borderRadius: '20px', marginLeft: '12px', marginRight: '13px' }} />
                            </div>
                            <div className='orderAdminButtonPro'>
                                <Skeleton height={40} width={100} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                                <Skeleton height={40} width={100} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                    categories.map((category) => (
                        <div className='AdminCardItem' key={category.id}>
                            <img className='AdminCardItemImgCate' src={category.image.src} alt="" />
                            <div className='orderTitleCardArminCate'>
                                <div className='orderTitleCardArminCa'>
                                    <h4><span className='spanAdminList2'>id:</span> #{category.id}</h4>
                                    <h4><span className='spanAdminList2'>categoria:</span> {category.name}</h4>
                                    <h4>
                                    <span className='spanAdminList2'>Aventuras asociadas:</span> ({categories.length || 0})
                                </h4>
                                </div>
                                <div className='detailCategoryPa'>
                                    <h4><span className='spanAdminList2'>descripcion:</span> {category.description}</h4>
                                </div>
                            </div>
                            <div className='orderAdminButtonPro'>
                                <Link className="Btn" to={`/administracion/categorias/editar_categoria/${category.id}`}>editar
                                    <MdOutlineEdit className="svg" />
                                </Link>
                                <button className="Btn" onClick={() => handleDeleteClick(category.id)}>
                                    borrar
                                    <RiDeleteBin5Line className="svg" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className='orderAddBtnAddm'>
                <Link to="/administracion/nueva_categoria" className="buttonAddListAdd">
                    <RiAddCircleFill className="svgIcon" />
                </Link>
            </div>
        </div>
    )
}