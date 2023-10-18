import { useContext, useEffect, useState } from 'react'
import { BiSolidUser } from "react-icons/bi"
import { GrMail } from "react-icons/gr"
import { FiLogOut } from "react-icons/fi"
import { PiLockKeyLight } from "react-icons/pi"
import { BsGear } from "react-icons/bs"
import { LuHistory } from "react-icons/lu"
import { FaRegBookmark } from "react-icons/fa"
import { BiHomeAlt2 } from "react-icons/bi"
import { AiFillPlusCircle } from "react-icons/ai"
import { RiAdminFill } from "react-icons/ri"
import { UserContext } from '../../context/userContext'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { Toaster, toast } from 'react-hot-toast';
import Styles from './UserSelector.module.css'

export const UserSelector = () => {

    const userValues = useContext(UserContext)
    const [userCode, setUserCode] = useState(userValues.jwtCode)

    const userObj = useContext(UserContext)
    const userData = userObj.user
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '/images/useravatar.png');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const changeProfileImageFromUrl = () => {
        if (imageUrl) {
            setProfileImage(imageUrl);
            localStorage.setItem('profileImage', imageUrl);
        }
        setModalIsOpen(false);
    };
    const handleLogout = () => {
        const urlLogout = 'http://184.73.112.5:8080/auth/logout'
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userCode}`
            }
        }
        fetch(urlLogout, settings)
            .then(response => setIsReload(response.status))

        sessionStorage.removeItem('token')
        setIsReload(true)
        navigate('/')
    }
    const [isReload, setIsReload] = useState(0)
    useEffect(() => {
        if (isReload === 200) {
            window.location.reload()
            setIsReload(0)
        }
    }, [isReload])
    return (
        <div className={Styles.nestedUser}>
            <nav className={Styles.navNestedUser}>
                <p className={Styles.titleBobDash}>Mi perfil</p>
                <div className={Styles.userDetailsBox}>
                    <div className={Styles.userImgDetailsBox}>
                        <img src={profileImage} alt="" />
                    </div>
                    <label htmlFor="profileImageInput" className={Styles.plusIcon}>
                        <AiFillPlusCircle className={Styles.plusIconIco} onClick={() => setModalIsOpen(true)} />
                    </label>
                    <ul className={Styles.infoBoxUD}>
                        <li>
                            <BiSolidUser className={Styles.iconUserDte} />
                            <p className={Styles.userNameUDP}>{userData.name} {userData.lastname}</p>
                        </li>
                        <li>
                            <GrMail className={Styles.iconUserDte} />
                            <p className={Styles.userNameUDP}>
                                {userData.email?.length > 18
                                    ? userData.email.substring(0, userData.email.indexOf('@')) + ("@..")
                                    : userData.email}
                            </p>
                        </li>
                        <li>
                            <RiAdminFill className={Styles.iconUserDte} />
                            {
                                userData.role === 'ADMIN' ? <p className={Styles.userNameUDP}>Administrador</p> : <p className={Styles.userNameUDP}>Usuario estandar</p>
                            }
                        </li>
                    </ul>
                </div>
                <div className={Styles.listNestedUsers}>
                    <hr className={Styles.listNestedUsersHR} />
                    <p className={Styles.titleBobDash}>Mi cuenta</p>
                    <ul>
                        <li className={Styles.listDraslist}>
                            <FaRegBookmark className={Styles.listDraslisticooo} />
                            <Link to="/usuario/favoritos">Favoritos</Link>
                        </li>
                        <li className={Styles.listDraslist}>
                            <LuHistory className={Styles.listDraslisticooo} />
                            <Link to="/usuario/historial">Reservas</Link></li>
                        <li className={Styles.listDraslist}>
                            <BsGear className={Styles.listDraslisticooo} />
                            <Link to="/usuario/editar_perfil">Editar Perfil</Link>
                        </li>
                        {userData.role === 'ADMIN' ?
                            <li className={Styles.listDraslist}>
                                <PiLockKeyLight />
                                <Link to="/administracion">Panel de Admin</Link>
                            </li>
                            : null
                        }
                        <li className={`${Styles.listDraslist} ${Styles.HomeInputuser}`}>
                            <BiHomeAlt2 />
                            <Link to="/">Volver al Inicio</Link>
                        </li>
                        <li className={`${Styles.listDraslist} ${Styles.CloseInput}`}>
                            <FiLogOut />
                            <Link onClick={() => {
                                handleLogout();
                                toast.success('¡Has cerrado sesión correctamente!');
                            }}>Cerrar Sesion</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Cargar imagen desde URL"
                ariaHideApp={false}
                style={{
                    content: {
                        width: '350px',
                        height: '450px',
                        margin: 'auto',
                        padding: '20px',
                        display: 'flex'
                    },
                }}
            >
                <div className={Styles.modalContent}>
                    <h2>Foto de perfil</h2>
                    <div className={Styles.modalLeft}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="" className={Styles.previewImage} />
                        ) : (
                            <img src="https://cdn.dribbble.com/users/236380/screenshots/6252027/uploading_process_1.2019-03-28_13_29_17.gif" alt="" className={Styles.previewImage} />
                        )}
                    </div>
                    <div className={Styles.modalRight}>
                        <p>Ingrese la URL para cargar</p>
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={Styles.inputProfileImg}
                        />
                        <button className={Styles.UploadProfileImg} onClick={changeProfileImageFromUrl}>Cargar</button>
                    </div>
                </div>
            </Modal>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    )
}
