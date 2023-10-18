/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { HiEye } from 'react-icons/hi';
import { RiDeleteBin5Line, RiAddCircleFill } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UserContext } from '../../context/userContext';
import 'react-loading-skeleton/dist/skeleton.css';
import './AdminListProducts.css';

export const AdminListProducts = () => {
    const userValues = useContext(UserContext)
    const token = userValues.jwtCode
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const numItems = 6
    const prevProductsRef = useRef(products);


    const renderStopper = useMemo(
        () => (products),
        []
    );

    useEffect(() => {
        const fetchData = () => {
            setLoading(false);
            fetch(`http://184.73.112.5:8080/product/all`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    setProducts(data)
                })
        };
        fetchData();
    }, [renderStopper]);

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#918f8e',
            cancelButtonColor: '#E95823',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://184.73.112.5:8080/product/${id}`
                const settings = {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                fetch(url, settings)
                    .then(response =>
                        console.log(response)
                    )
                Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
            }
        });
    };

    return (
        <div className="listProductsAdmin">
            <p>
                Administracion &gt; Servicios &gt;{" "}
                <span className="spanAdminList">ver Aventuras</span>
            </p>
            <h3>Mis Publicaciones</h3>
            <div>
                {loading || !products.content ? (
                    <div>
                        {[...Array(numItems)].map((_, index) => (
                            <div className='AdminCardItem' key={index}>
                                <div>
                                    <Skeleton height={192} width={190} style={{ borderRadius: '20px 0px 0px 20px', marginRight: '2px' }} />
                                </div>
                                <div className='divSke'>
                                    <Skeleton height={192} width={660} style={{ borderRadius: '0px 20px 20px 0px', marginLeft: '2px', marginRight: '13px' }} />
                                </div>
                                <div className='orderAdminButtonPro'>
                                    <Skeleton height={40} width={98} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                                    <Skeleton height={40} width={98} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                                    <Skeleton height={40} width={98} style={{ marginRight: '10px', marginLeft: '10px', borderRadius: '10px', boxShadow: '6px 6px 12px #c5c5c5,-6px -6px 12px #ebeaea' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    products.content?.map((product) => (
                        <div className="AdminCardItem" key={product.id}>
                            <img className="AdminCardItemImg" src={product.mainImage.src} alt="" />
                            <div className="AdminCardItemDetail">
                                <div className="orderTitleCardArmin">
                                    <h4>
                                        <span className="spanAdminList2">id: </span> #{product.id}
                                    </h4>
                                    <h4>
                                        <span className="spanAdminList2">titulo: </span>{" "}
                                        {product.name}
                                    </h4>
                                    <h4>
                                        <span className="spanAdminList2">categoria: </span>{" "}
                                        {product.category.name}
                                    </h4>
                                    <h4>
                                        <span className="spanAdminList2">precio: </span>{" "}
                                        ${product.price}
                                    </h4>
                                </div>
                                <hr className="hrAdminDetailP" />
                                <div className="orderTitleCardArminTwo">
                                    <div className='orderTitleCardArminDes'>
                                        <h5 className="spanAdminList2">Descripcion:</h5>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className="orderListTitle">
                                        <h5 className="spanAdminList2">Caracteristicas:</h5>
                                        <div>
                                            <ul className="listAdminProductDet two-column-list">
                                                {product.features.map((feature) => {
                                                    return product.features ? <li key={feature.id}>{feature.name}</li> : null;
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderAdminButtonPro">
                                <Link className="Btn" to={`/detail/${product.id}`}>
                                    ver <HiEye className="svg" />
                                </Link>
                                <Link className="Btn" to={`/administracion/aventuras/editar_aventura/${product.id}`}>
                                    editar <MdOutlineEdit className="svg" />
                                </Link>
                                <button className="Btn" onClick={() => handleDeleteClick(product.id)}>
                                    borrar <RiDeleteBin5Line className="svg" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="orderAddBtnAddm">
                <Link to="/administracion/nueva_aventura" className="buttonAddListAdd">
                    <RiAddCircleFill className="svgIcon" />
                </Link>
            </div>
        </div>
    );
}