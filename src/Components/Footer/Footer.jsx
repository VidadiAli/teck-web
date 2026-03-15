import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="vns-footer">
            <div className="vns-footer-container">

                <div className="vns-footer-brand">
                    <h2 className="vns-footer-logo">VNSelectronics</h2>
                    <p className="vns-footer-desc">
                        Elektronika məhsullarını sərfəli qiymətlərlə əldə edin.
                    </p>
                </div>

                <div className="vns-footer-social">
                    <a href="https://www.instagram.com/vns_electronicss/" className="vns-footer-icon" target="_blank">
                        <FaInstagram />
                    </a>
                    <a href="https://wa.me/994558781998" className="vns-footer-icon" target="_blank">
                        <FaWhatsapp />
                    </a>
                    <a href="https://www.tiktok.com/@vns_electronicss" className="vns-footer-icon" target="_blank">
                        <FaTiktok />
                    </a>
                </div>

                <div className="vns-footer-links">
                    <NavLink to="/">Ana səhifə</NavLink>
                    <NavLink to="/products">Məhsullar</NavLink>
                    <NavLink to="/likeds">Bəyənilənlər</NavLink>
                </div>
            </div>

            <div className="vns-footer-bottom">
                © 2026 VNSelectronics
            </div>
        </footer>
    );
};

export default Footer;