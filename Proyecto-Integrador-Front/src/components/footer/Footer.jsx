import { Link } from "react-router-dom";
import { FaLinkedinIn, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footerPag">
            <div className="orderFooterPag">
                <Link to='/'>
                    <img src="/images/logo-footer.png" alt="logotype Rutas Salvajes" className="logo" />
                </Link>
                <div>
                    <ul className="ListRedesFoot">
                        <Link to="https://www.facebook.com">
                            <li className="social-link">
                                <FaFacebook />
                            </li>
                        </Link>
                        <Link to="https://www.linkedin.com">
                            <li className="social-link">
                                <FaLinkedinIn />
                            </li>
                        </Link>
                        <Link to="https://www.twitter.com">
                            <li className="social-link">
                                <FaTwitter />
                            </li>
                        </Link>
                        <Link to="https://www.instagram.com">
                            <li className="social-link">
                                <FaInstagram />
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="rights">
                <p>&copy;{currentYear} Rutas Salvajes - All rights reserved.</p>
            </div>
        </footer>
    )
}