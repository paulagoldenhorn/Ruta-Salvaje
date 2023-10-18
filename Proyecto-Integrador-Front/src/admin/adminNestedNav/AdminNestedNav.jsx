import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import { MdTravelExplore } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { RiShieldKeyholeLine, RiUserSettingsLine } from 'react-icons/ri';
import { BsGear } from "react-icons/bs"
import Styles from './AdminNestedNav.module.css';

export const AdminNestedNav = () => {
    return (
        <div className={Styles.nested}>
            <div className={Styles.navTttNested}>
                <h4>Panel de Admin</h4>
                <BsGear className={Styles.imgNeste} />
            </div>
            <nav className={Styles.navNested}>
                <ul className={Styles.listNested}>
                    <div className={Styles.ConttitleNested}>
                        <MdTravelExplore className={Styles.imgNester} />
                        <p className={Styles.titleNested}>Servicios</p>
                    </div>
                    <li><Link to="/administracion/aventuras">ver Aventuras</Link></li>
                    <li><Link to="/administracion/nueva_aventura">agregar nueva</Link></li>
                </ul>
                <ul className={Styles.listNested}>
                    <div className={Styles.ConttitleNested}>
                        <BiCategory className={Styles.imgNester} />
                        <p className={Styles.titleNested}>Categoría</p>
                    </div>
                    <li><Link to="/administracion/categorias">ver categorias</Link></li>
                    <li><Link to="/administracion/nueva_categoria">agregar nueva</Link></li>
                </ul>
                <ul className={Styles.listNested}>
                    <div className={Styles.ConttitleNested}>
                        <TbListDetails className={Styles.imgNester} />
                        <p className={Styles.titleNested}>Caracteristicas</p>
                    </div>
                    <li><Link to="/administracion/caracteristicas">ver caracteristicas</Link></li>
                    <li><Link to="/administracion/nueva_caracteristica">agregar nueva</Link></li>
                </ul>
                <ul className={Styles.listNested}>
                    <div className={Styles.ConttitleNested}>
                        <RiShieldKeyholeLine className={Styles.imgNester} />
                        <p className={Styles.titleNested}>
                            Usuarios</p>
                    </div>
                    <li><Link to="/administracion/usuarios">Permisos</Link></li>
                </ul>
                <ul className={Styles.listNested}>
                    <div className={Styles.ConttitleNested}>
                        <RiUserSettingsLine className={Styles.imgNester} />
                        <p className={Styles.titleNested}>
                            Panel de Usuario</p>
                    </div>
                    <li><Link to="/usuario">Ir al panel</Link></li>
                </ul>
            </nav>
        </div>
    );
};