import "./Logout.css"

export const Logout = () => {
  return (
    <div className="logout-container">
        <div className="logout-section">
            <div className="logout-btn-container">
                <h4>Cerrar sesión</h4>
                <button className="logout-btn">Cerrar sesión</button>
            </div>
            <div className="logout-img-container">
                <img src="images/login.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}