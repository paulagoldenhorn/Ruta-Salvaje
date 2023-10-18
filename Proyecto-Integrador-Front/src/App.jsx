import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar"
import { Home } from "./routes/home/Home";
import { Detail } from "./routes/detail/Detail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { Footer } from "./components/footer/Footer";
import { Logout } from "./components/logout/Logout";
import { AdminMenu } from "./routes/adminMenu/AdminMenu";
import { UserDetails } from "./routes/userDetails/UserDetails";
import { SearchProduct } from "./routes/searchProduct/SearchProduct";
import WhatsApp from "./components/WhatsApp/WhatsApp";
import Reservation from "./components/reservation/Reservation";
import { RecoverPassword } from "./components/recoverPassword/RecoverPassword";
import ReservationSuccess from "./components/reservationSuccess/ReservationSuccess";
import './App.css';

function App() {

  return (
    
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/usuario/*' element={<UserDetails/>}/>
        <Route path='/administracion/*' element={<AdminMenu/>}/>      
        <Route path="/detail/:pid" element={<Detail/>} />
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/reservation/success" element={<ReservationSuccess/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/recover-password" element={<RecoverPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/search" element={<SearchProduct/>} />
      </Routes>
      <WhatsApp/>
      <Footer/>
    </BrowserRouter>

  )
}

export default App
