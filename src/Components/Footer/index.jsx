import { Container } from "react-bootstrap";
import "./style.css";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { Tooltip } from 'antd';

const Footer = () => {
    return (
        <div className="main-footer">
            <Container className="footer-container">
                <div className="footer-sec-1">
                    <h1 className="mb-1">About Us</h1>
                    <p>
                        Zarovia is an online apparel brand launched in 2021, dedicated to bringing a perfect blend of youthful, elegant, and trendy styles at highly affordable prices. At Zarovia, we strive to offer top-quality craftsmanship and fashionable designs that fit every budget.
                    </p>
                </div>
                <div className="footer-sec-5">
                    <div className="social-links-div">
                        <Link to={"/"} target="_blank" className="social-link">
                            <Tooltip title="Follow on Facebook">
                                <FaFacebookF size={28} />
                            </Tooltip>
                        </Link>
                        <Link to={"/"} target="_blank" className="social-link instagram-link">
                            <Tooltip title="Follow on Instagram">
                                <FaInstagram size={28} />
                            </Tooltip>
                        </Link>
                        <Link to={"mailto:"} target="_blank" className="social-link mail-link">
                            <Tooltip title="Email">
                                <IoMdMail size={28} />
                            </Tooltip>
                        </Link>
                        {/* tel:+923183253219 */}
                        <Link to={"/"} className="social-link phone-link">
                            <Tooltip title="Phone">
                                <FaPhoneAlt size={28} />
                            </Tooltip>
                        </Link>
                    </div>
                    <div className="footer-links-div">
                        <Link to={'/policies/aboutUs'} className="footer-links">
                            About Us
                        </Link>
                        <Link to={'/policies/termsAndConditions'} className="footer-links">
                            Terms & Conditions
                        </Link>
                        <Link to={'/policies/termsOfService'} className="footer-links">
                            Terms of Service
                        </Link>
                        <Link to={'/policies/shippingPolicy'} className="footer-links">
                            Shipping Policy
                        </Link>
                        <Link to={'/policies/privacyPolicy'} className="footer-links">
                            Privacy Policy
                        </Link>
                        <Link to={'/policies/returnAndExchangePolicy'} className="footer-links">
                            Return & Exchange Policy
                        </Link>
                        <Link to={'/policies/refundPolicy'} className="footer-links">
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </Container>
            <div className="footer-sec-4">
                <div className="footer-sec-4-container">
                    <span>© 2024 - Innovative Hive</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;