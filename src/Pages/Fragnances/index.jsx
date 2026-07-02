import "./style.css";
import { Container } from "react-bootstrap";
import { Navbar, Footer } from "../../Components";

const Fragnances = () => {
    return (
        <>
            <Navbar />
            <div className="main-fragrance-page-div">
                <Container>
                    <div className="coming-soon-body">
                        <h1>
                            Coming Soon
                        </h1>
                        <p>
                            We're working hard to bring you something amazing. Stay tuned!
                        </p>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Fragnances;