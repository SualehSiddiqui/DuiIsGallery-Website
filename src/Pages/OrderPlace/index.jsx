import "./style.css";
import { Container } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ShopItemList, Button } from "../../Components";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"

const OrderPlace = () => {

    const userDetails = localStorage.getItem('userDetails');
    const user = userDetails ? JSON.parse(userDetails) : '';
    const navigate = useNavigate();

    return (
        <Container className="check-out-container">
            <div className="customer-details-main">
                <img src={Logo} alt="Zarovia" />
                <Accordion className="res-product-list">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            borderLeft: "none",
                            borderRight: "none",
                        }}
                    >
                        <Typography>Show Order Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ShopItemList />
                    </AccordionDetails>
                </Accordion>
                <div className="confirmation-order">
                    <span>
                        <TiTick />
                    </span>
                    <p>
                        <span>Confirmation  </span>
                        Thank You, {`${user.firstName} ${user.lastName}!`}
                    </p>
                </div>
                <div className="mt-5">
                    <div className="order-paced-hd">
                        Your order is confirmed
                        <span>You will recieve a confirmation email shortly</span>
                    </div>
                    <div className="order-paced-hd">
                        <h5> Order Details</h5>
                        <div>
                            <div>
                                <h6 className="mt-3">Contact infromation</h6>
                                <span>{user.email}</span>
                                <h6 className="mt-3">Shipping address</h6>
                                <span>{user.address}</span>
                                <h6 className="mt-3">Shipping method</h6>
                                <span>Shipping</span>
                            </div>
                            <div>
                                <h6 className="mt-3">Payment method</h6>
                                <span>Cash on Delivery (COD) </span>
                                <h6 className="mt-3">Billing address</h6>
                                <span>{user.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button title={'Continue Shopping'} onClick={e => (navigate('/'))} addclass='mt-4' />
            </div>
            {/* <div className="order-details-main">
                <ShopItemList />
            </div> */}
        </Container>
    );
};

export default OrderPlace;