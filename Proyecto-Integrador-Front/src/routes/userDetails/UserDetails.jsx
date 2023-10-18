import { UserDetailsFav } from '../../dashboardUser/userDetailsFav/UserDetailsFav'
import { UserSelector } from '../../dashboardUser/userSelector/UserSelector'
import { Link, Route, Routes } from 'react-router-dom'
import { UserHistory } from '../../dashboardUser/userHistory/UserHistory'
import { UserEditInfo } from '../../dashboardUser/userEditInfo/UserEditInfo'
import { UserContext } from '../../context/userContext'
import { useContext, useState } from 'react'
import Styles from './userDetails.module.css'

export const UserDetails = ({ id }) => {
  const userValues = useContext(UserContext)
  const [token, setToken] = useState(userValues.jwtCode)

  if (token === "") {
    return (
      <div className="warningMessage">
        <h3>Ups! No posees permisos.</h3>
        <p>Debes registrarte o iniciar sesion para acceder al panel de usuario.</p>
        <Link className='btnBadTokenAdmin' to={"/login"}>Iniciar sesion</Link>
        <div>
          <img className='imgBadTokenAdmin' src="/images/logo-footer.png" alt="" />
        </div>
      </div>
    );
  }
    return (
        token !== "" &&
        <div className={Styles.DashboardBoxBig}>
            <div className={Styles.DashboardBoxFilter}>
            <UserSelector/>
            </div>
            <div className={Styles.DashboardBoxResult}>
                <Routes>
                    <Route path="/favoritos" element={<UserDetailsFav key={id} />} />
                    <Route path="/historial" element={<UserHistory />} />
                    <Route path="/editar_perfil" element={<UserEditInfo />} />
                    <Route path="/*" element={<UserDetailsFav key={id} />} />
                </Routes>
            </div>
        </div>
    )
}
