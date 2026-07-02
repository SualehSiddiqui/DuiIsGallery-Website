import "./style.css";
import { Container } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ShopItemList } from '../../Components';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "../../assets/logo.png"

const style = {
    py: 0,
    width: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    marginTop: '30px'
};

const ShippingAndPayment = () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || []);
    const user = localStorage.getItem('user');
    const userObj = user && (typeof user === 'string' ? JSON.parse(user) : '');
    const userDetails = localStorage.getItem('userDetails');
    const userDetailsObj = userDetails && (typeof userDetails === 'string' ? JSON.parse(userDetails) : '');
    const navigate = useNavigate();

    const placeOrder = () => {
        if (cartData.length > 0) {
            let totalAmount = 0;
            for (let i = 0; i < cartData.length; i++) {
                totalAmount = totalAmount + Number(cartData[i].totalPrice);
            }

            const order = {
                items: cartData,
                userDetails: {
                    firstName: userDetailsObj.firstName,
                    lastName: userDetailsObj.lastName,
                    shippingAddress: `${userDetailsObj.address}, ${userDetailsObj.city}`,
                    city: userDetailsObj.city,
                    email: userDetailsObj.email,
                    phone: userDetailsObj.phone,
                    userId: userObj ? userObj._id : "",
                    currentLocation: userDetailsObj.currentLocation,
                },
                totalAmount,
                shippingFee: Number(userDetailsObj.shippingFee),
            };

            axios.post(`${import.meta.env.VITE_SERVER_API_URL}/order/`, order, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    localStorage.setItem('order', JSON.stringify(res.data.order));
                    navigate('/orderPlace')
                    localStorage.removeItem('cart');
                })
                .catch(error => {
                    // Error handler
                    if (error.response) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message || 'Failed to create ledger.',
                        });
                        console.log('Error response:', error.response.data);
                    } else if (error.request) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No Response',
                            text: 'No response from server.',
                        });
                        console.log('Error request:', error.request);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message,
                        });
                        console.log('Error message:', error.message);
                    }
                })
        }
    };

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
                        <ShopItemList data={cartData} />
                    </AccordionDetails>
                </Accordion>
                <Breadcrumbs separator='>' className="mt-3" aria-label="breadcrumb">
                    <Link underline="hover" color="inherit">
                        Cart
                    </Link>
                    <Typography color="text.primary">Information</Typography>
                    <Link
                        underline="hover"
                        color="inherit"
                    >
                        Shipping and Payment
                    </Link>
                </Breadcrumbs>
                <List sx={style}>
                    <ListItem className="contact-detials" >
                        <span>Contact</span>
                        <p>
                            <span className="shipping-details">{userDetailsObj && userDetailsObj.email}</span>
                            <Link href="/checkOut">
                                change
                            </Link>
                        </p>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem className="contact-detials">
                        <span>Shipping</span>
                        <p>
                            <span className="shipping-details">{userDetailsObj && userDetailsObj.address}</span>
                            <Link href="/checkOut">
                                change
                            </Link>
                        </p>
                    </ListItem>
                </List>
                <h3 className="shipping-hd">
                    Shipping
                </h3>
                <List sx={style}>
                    <ListItem className="shipping-method" >
                        <span>Shipping Fees</span>
                        <p>Rs {userDetailsObj && userDetailsObj.shippingFee}</p>
                    </ListItem>
                </List>
                <h3 className="shipping-hd">
                    Payment Method
                </h3>
                <List sx={style}>
                    <ListItem className="shipping-method" >
                        <span>Payment Method</span>
                        <p>Cash on Delivery (COD)</p>
                    </ListItem>
                </List>
                <div className="submit-btton-div mt-4">
                    <Link href='/checkOut'>Return to Information</Link>
                    <Button title={'Place Order'} onClick={placeOrder} type='submit' />
                </div>
            </div>
            <div className="order-details-main">
                <ShopItemList data={cartData} />
            </div>
        </Container>
    );
};

export default ShippingAndPayment;