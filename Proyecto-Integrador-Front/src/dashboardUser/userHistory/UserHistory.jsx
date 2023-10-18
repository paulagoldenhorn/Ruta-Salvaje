/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { LuHistory } from 'react-icons/lu';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import { LoaderAnimation } from '../../components/loaderAnimation/LoaderAnimation';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Styles from './UserHistory.module.css';

export const UserHistory = () => {

    const userValues = useContext(UserContext);
    const token = userValues.jwtCode;

    const [reservations, setReservations] = useState([]);
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [reservationChanges, setReservationChanges] = useState(0)

    const renderStopper = useMemo(() => products, [products]);

    const [pendientes, setIsPendientes] = useState(0);
    const [completadas, setIsCompletadas] = useState(0);
    const [canceladas, setIsCanceladas] = useState(0);

    const location = useLocation();
    const receivedState = location.state;
    const personas = receivedState ? receivedState.personas : 1

    useEffect(() => {
        const fetchData = () => {
            fetch(`http://184.73.112.5:8080/product/all`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setProducts(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching products', error);
                    setIsLoading(false);
                });
        };
        fetchData();
    }, []);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch('http://184.73.112.5:8080/reservation/user', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setReservations(data);
            })
            .catch((error) => console.error('Error fetching reservations', error));
    }, [token]);

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#918f8e',
            cancelButtonColor: '#E95823',
            confirmButtonText: 'Sí, eliminar reserva',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://184.73.112.5:8080/reservation/${id}`
                const settings = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                fetch(url, settings)
                    .then(response => {
                        if (response.status == 200) {
                            setReservationChanges(reservationChanges + 1)
                            Swal.fire('Eliminado', 'La Reserva ha sido eliminado.', 'success');
                        }
                    })
            }
        });
    }

    const pendientesCount = reservations.length
    const completadasCount = 0
    const canceladasCount = 0
    const totalReservas = pendientesCount + completadasCount + canceladasCount;


    return (
        <div>
            <div className={Styles.boxXitemsContainer}>
                {reservations.length === 0 ? (
                    <h3>Aun no posees reservas completadas</h3>
                ) : (
                    <h3>Historial de reservas</h3>
                )}
                <LuHistory className={Styles.iconSave} />
            </div>
            {isLoading ? (
                <div className={Styles.loadder}>
                    <LoaderAnimation />
                </div>
            ) : (
                reservations.map((reservation) => (
                    <div className={Styles.ReservCardMo} key={reservation.id}>
                        <div>
                            {products.content
                                ?.filter((product) => reservation.product.id === product.id)
                                .map((filteredProduct) => (
                                    <div className={Styles.ReservCardItem} key={filteredProduct.id}>
                                        <img className={Styles.ReservCardItemImg} src={filteredProduct.mainImage.src} alt="" />
                                        <div className={Styles.ReservCardItemDetail}>
                                            <div className={Styles.ReservCardtitle}>
                                                <h4>
                                                    <span className={Styles.spanAdminListRes}>Aventura: </span>
                                                    {filteredProduct.name?.length > 24
                                                        ? filteredProduct.name
                                                            .substring(0, filteredProduct.name.indexOf(' ')) + ("..")
                                                        : filteredProduct.name}
                                                </h4>
                                                <h4 className={Styles.spanAdminListResNone}>
                                                    <span className={`${Styles.spanAdminListRes} ${Styles.spanAdminListResNone}`}></span> #{reservation.id}
                                                </h4>
                                            </div>
                                            <hr className={Styles.spanAdminListHr} />
                                            <ul className={Styles.detailResBtoo}>
                                                <div className={Styles.ordenListUserInfoRes}>
                                                    <li className={Styles.detailResBtooLi}>
                                                        <p>
                                                            Inicio de Aventura
                                                        </p>
                                                        <h4>
                                                            {reservation.start_date}
                                                        </h4>
                                                    </li>
                                                    <li className={Styles.detailResBtooLi}>
                                                        <p>
                                                            Fin de Aventura
                                                        </p>
                                                        <h4>
                                                            {reservation.end_date}
                                                        </h4>
                                                    </li>
                                                </div>
                                                <div className={Styles.ordenListUserInfoRes}>
                                                    <li className={Styles.detailResBtooLi}>
                                                        <p>
                                                            Precio final
                                                        </p>
                                                        <h4>
                                                            ${reservation.price}
                                                        </h4>
                                                    </li>
                                                    <li className={Styles.detailResBtooLi}>
                                                        <p>
                                                            Personas
                                                        </p>
                                                        <h4>
                                                            {personas} Persona
                                                        </h4>
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                        <div className={Styles.orderResButtonPro}>
                                            <Link className={Styles.BtnResrv} to={`/detail/${filteredProduct.id}`}>
                                                ver <HiEye className={Styles.svgRes} />
                                            </Link>
                                            <button className={Styles.BtnResrv} onClick={() => handleDeleteClick(reservation.id)}>
                                                borrar <RiDeleteBin5Line className={Styles.svgRes} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            {products.content && products.content.length > 0 &&
                                !products.content.some((product) => reservation.product.id === product.id) && (
                                    <p>No hay productos asociados a esta reserva.</p>
                                )}
                        </div>
                    </div>
                ))
            )}
            <div className={Styles.registerResMarrr}>
                <ul className={Styles.registerRes}>
                    <li className={`${Styles.registerResList} ${Styles.classList2}`}>
                        <h3>{completadasCount}</h3>
                        <h4 className={Styles.registerResCompletadas}>
                            Completadas
                        </h4>
                    </li>
                    <li className={`${Styles.registerResList} ${Styles.classList2}`}>
                        <h3>{pendientesCount}</h3>
                        <h4 className={Styles.registerResPendientes}>
                            Pendientes
                        </h4>
                    </li>
                    <li className={`${Styles.registerResList} ${Styles.classList2}`}>
                        <h3>{canceladasCount}</h3>
                        <h4 className={Styles.registerResCanceladas}>
                            Canceladas
                        </h4>
                    </li>
                </ul>
            </div>
        </div>
    );
}