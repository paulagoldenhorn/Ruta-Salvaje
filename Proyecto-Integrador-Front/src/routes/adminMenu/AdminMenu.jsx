/* eslint-disable no-unused-vars */
import { AdminNestedNav } from '../../admin/adminNestedNav/AdminNestedNav';
import { AdminListCategory } from '../../admin/adminListCategory/AdminListCategory';
import { AdminListChar } from '../../admin/adminListChar/AdminListChar';
import { AdminListProducts } from '../../admin/adminListProducts/AdminListProducts';
import { AdminRegisterCategory } from '../../admin/adminRegisterCategory/AdminRegisterCategory';
import { AdminRegisterChar } from '../../admin/adminRegisterChar/AdminRegisterChar';
import { AdminRegisterProducts } from '../../admin/adminRegisterProducts/AdminRegisterProducts';
import { Link, Route, Routes } from 'react-router-dom';
import { AdminEditCategory } from '../../admin/adminEditCategory/AdminEditCategory';
import { AdminEditChar } from '../../admin/adminEditChar/AdminEditChar';
import { AdminEditProducts } from '../../admin/adminEditProducts/AdminEditProducts';
import { AdminListUsers } from '../../admin/adminListUsers/AdminListUsers';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import './AdminMenu.css';

export const AdminMenu = () => {
  const [showWarning, setShowWarning] = useState(false);
  const userValues = useContext(UserContext)
  const [token, setToken] = useState(userValues.jwtCode)
  useEffect(() => {
    const handleResize = () => {
      setShowWarning(window.innerWidth < 1121);
    }
    handleResize();
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (token === "") {
    return (
      <div className="warningMessage">
        <h3>No posees autorización para acceder al panel de administración.</h3>
        <p>Por favor, inicia sesión con las credenciales adecuadas.</p>
        <Link className='btnBadTokenAdmin' to={"/"}>Volver a la página de inicio</Link>
        <div>
          <img className='imgBadTokenAdmin' src="/images/logo-footer.png" alt="" />
        </div>
      </div>
    );
  }

  return (
    token !== "" &&
    <div className='containerAdminMenu'>
      {showWarning && (
        <div className="warningMessage">
          <h3>Solo puedes acceder al panel de administración desde una computadora de escritorio.</h3>
          <p>Lo sentimos :( </p>
          <Link to={"/"}>
            <img className='imgWarning' src="/images/logo-footer.png" alt="" />
          </Link>
        </div>
      )}<AdminNestedNav />
      <div className="containerAdminMenuChild" >
        <Routes>
          <Route path='*' element={<AdminListProducts />} />
          <Route path="/aventuras/*" element={<AdminListProducts />} />
          <Route path="/categorias/*" element={<AdminListCategory />} />
          <Route path="/caracteristicas/*" element={<AdminListChar />} />
          <Route path="/usuarios/*" element={<AdminListUsers />} />
          <Route path="/nueva_aventura" element={<AdminRegisterProducts />} />
          <Route path="/nueva_categoria" element={<AdminRegisterCategory />} />
          <Route path="/nueva_caracteristica" element={<AdminRegisterChar />} />
          <Route path="/aventuras/editar_aventura/:aid" element={<AdminEditProducts />} />
          <Route path="/categorias/editar_categoria/:cid" element={<AdminEditCategory />} />
          <Route path="/caracteristicas/editar_caracteristica/:fid" element={<AdminEditChar />} />
        </Routes>
      </div>
    </div>
  );
};