import { Container } from "react-bootstrap";
import "./style.css";
import ReadyToWear from "../../Assets/Section2/Ready_to_Wear.webp"
import Formal from "../../Assets/Section2/Formal.webp"
import { Link, useNavigate } from "react-router-dom";

const Section2 = () => {
    return (
        <div className="main-sec2new-div">
            <Container className="sec2new-conatiner">
                <Link className="img-container">
                    <h1>Special Offer</h1>
                    <p>Don't Miss out</p>
                </Link>
                <Link to={'/collection/new_arrival'} className="img-container">
                    <h1>New Arrival</h1>
                </Link>
                <Link to={'/policies/aboutUs'} className="img-container">
                    <h1>About US</h1>
                </Link>
            </Container>
        </div>
    );
};

export default Section2