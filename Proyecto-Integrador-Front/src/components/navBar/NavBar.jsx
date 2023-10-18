import { Link } from "react-router-dom"
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { BiLogOut, BiLogIn, BiUserPlus } from "react-icons/bi";
import { AiOutlineProfile } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import './NavBar.css';
import 'animate.css';

export const NavBar = () => {

  const userValues = useContext(UserContext)
  const [userCode, setUserCode] = useState(userValues.jwtCode)
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [])

  const [open, setOpen] = useState(false)

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  });
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


  const DynamicNavBar = ({ role }) => {
    if (userValues.user) {
      if (role === 'ADMIN') {
        return (
          <div className='loggedUser'>
            <div className="userData">
              <Link to="/administracion" className="navBarUserBtn">Panel administracion</Link>
              <button onClick={handleLogout} className="navBarUserBtn">Cerrar sesión</button>
            </div>
            <Link className="userIcon" to='/usuario'>
              <p>{userValues.user.name.charAt(0).toUpperCase()}{userValues.user.lastname.charAt(0).toUpperCase()}</p>
            </Link>
          </div>
        )
      }
      if (role === 'BASIC') {
        return (
          <div className='loggedUser'>
            <div className="userData">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <Link className="userIcon" to='/usuario'>
              <p>{userValues.user.name.charAt(0).toUpperCase()}{userValues.user.lastname.charAt(0).toUpperCase()}</p>
            </Link>
          </div>
        )
      }
      return (
        <div className="logInSection">
          <Link to="/register" className="custom-link-reversed">
            Crear cuenta
          </Link>
          <Link to="/login" className="custom-link">
            Iniciar sesión
          </Link>
        </div>
      )
    }
  }

  const DynamicNavBarMobile = ({ role }) => {
    if (userValues.user) {
      if (role === 'ADMIN') {
        return (
          <div ref={menuRef}>
            <div className="logoutMobile menu-trigger" onClick={() => { setOpen(!open) }}>
              <VscMenu className={`userIconLoggedOut ${open ? 'openIcon' : 'closedIcon'}`} />
            </div>
            <div className={`dropdownMenu ${open ? 'active animate__animated animate__slideInRight animate__faster' : 'inactive'}`}>
              <p className="menuName">Hola {userValues.user.name}</p>
              <ul>
                <li className='dropdownItem'><Link to='/usuario'><div className="optionSelect"> <AiOutlineProfile className="menuIcon" /> <p>Mi perfil</p> </div></Link></li>
                <li className='dropdownItem'><Link to='/usuario'><div className="optionSelect"> <FaRegBookmark className="menuIcon" /> <p>Mis favoritos</p> </div></Link></li>
                <li className='dropdownItem'><div onClick={handleLogout} className="optionSelect"> <BiLogOut className="menuIcon" /> <p>Cerrar sesion</p> </div></li>
              </ul>
            </div>
          </div>
        )
      }
      if (role === 'BASIC') {
        return (
          <div ref={menuRef}>
            <div className="logoutMobile menu-trigger" onClick={() => { setOpen(!open) }}>
              <VscMenu className={`userIconLoggedOut ${open ? 'openIcon' : 'closedIcon'}`} />
            </div>
            <div className={`dropdownMenu ${open ? 'active animate__animated animate__slideInRight animate__faster' : 'inactive'}`}>
              <p className="menuName">Hola {userValues.user.name}</p>
              <ul>
                <li className='dropdownItem'><Link to='/usuario'><div className="optionSelect"> <AiOutlineProfile className="menuIcon" /> <p>Mi perfil</p> </div></Link></li>
                <li className='dropdownItem'><Link to='/usuario'><div className="optionSelect"> <FaRegBookmark className="menuIcon" /> <p>Mis favoritos</p> </div></Link></li>
                <li className='dropdownItem'><div onClick={handleLogout} className="optionSelect"> <BiLogOut className="menuIcon" /> <p>Cerrar sesion</p> </div></li>
              </ul>
            </div>
          </div>
        )
      }

      return (
        <div ref={menuRef}>
          <div className="logoutMobile menu-trigger" onClick={() => { setOpen(!open) }}>
            <VscMenu className={`userIconLoggedOut ${open ? 'openIcon' : 'closedIcon'}`} />
          </div>
          <div className={`dropdownMenu ${open ? 'active animate__animated animate__slideInRight animate__faster' : 'inactive'}`}>
            <ul>
              <li className='dropdownItem'><Link to='/login'><div className="optionSelect"> <BiLogIn className="menuIcon" /> <p>Iniciar sesion</p> </div></Link></li>
              <li className='dropdownItem'><Link to='/register'><div className="optionSelect"> <BiUserPlus className="menuIcon" /> <p>Crear cuenta</p> </div></Link></li>
            </ul>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <nav className="navBarNav">
        {
          width > 1120 ? <>
            <div className="logoSection">
              <Link to="/">
                <img src="/images/logoAndPhrase.png" alt="" />
              </Link>
            </div>
            <DynamicNavBar role={userValues.user.role} />
          </> : <>
            <div className="logoSection">
              <Link to="/">
                <img src="/images/LogotipoV2.png" alt="" />
              </Link>
            </div>
            <DynamicNavBarMobile role={userValues.user.role} />
          </>
        }
      </nav>
    </>
  )
}