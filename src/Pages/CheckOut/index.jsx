import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button, ShopItemList } from "../../Components";
import BootButton from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserContext from "../../Context/User/userContext.js";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "../../assets/logo.png"

const capitalizeWords = (str) => {
    return str
        .toLowerCase() // Convert the entire string to lowercase
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' ');    // Join the array back into a single string
};

const CheckOut = ({ setShowSpinner }) => {
    const { user, setUser } = useContext(UserContext);
    const userObj = user && (typeof user === 'string' ? JSON.parse(user) : user);
    const userDetails = localStorage.getItem('userDetails');
    const userDetailsObj = userDetails && (typeof userDetails === typeof '' ? JSON.parse(userDetails) : userDetails);
    //token
    const token = localStorage.getItem('token');
    const tokenValue = token ? token.slice(1, token.length - 1) : "";
    const cartData = JSON.parse(localStorage.getItem('cart'));

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [currentLocation, setCurrentLocation] = useState({});
    const [shippingCities, setShippingCities] = useState([]);
    const naviigate = useNavigate();

    const reset = () => {
        setEmail('');
        setLastName('');
        setFirstName('');
        setPhone('');
        setCity('');
        setAddress('');
        setPostalCode('');
    };

    const getShippinglist = (status) => {
        setShowSpinner(true);
        const url = `${import.meta.env.VITE_SERVER_API_URL}/shipping/${status}`;
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenValue}`
            }
        })
            .then(res => {
                setShowSpinner(false);
                setShippingCities(res.data.data);
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
    };

    const handleSubmit = (e) => {
        setShowSpinner(true);
        e.preventDefault();

        let userDetails = {
            email,
            firstName,
            lastName,
            phone,
            city,
            address,
            postalCode,
            currentLocation
        };

        const url = `${import.meta.env.VITE_SERVER_API_URL}/shipping/oneByName/${city}`
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenValue}`
            }
        })
            .then(res => {
                userDetails = { ...userDetails, shippingFee: res.data.data.price };
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                setUser(JSON.stringify(userDetails));
                reset()
                naviigate('/shippingandPayment');
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
            .finally(() => {
                setShowSpinner(false);
            })
    };

    const getData = () => {
        if (Object.keys(userObj).length !== 0) {
            setEmail(userObj.email);
            setFirstName(userObj.firstName);
            setLastName(userObj.lastName);
            setPhone(userObj.phone);
        }
        if (userDetailsObj) {
            setCity(userDetailsObj.city);
            setAddress(userDetailsObj.address);
            setPostalCode(userDetailsObj.postalCode);
        }
    };

    const handleCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((loc) => {
            setCurrentLocation({
                longitude: loc.coords.longitude,
                latitude: loc.coords.latitude,
            })
        }, (err) => {
            console.log('Error Accessing Location')
        })
    }

    useEffect(() => {
        getData();
        getShippinglist(true);
    }, []);

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
                <form onSubmit={handleSubmit}>
                    <h3>
                        Contact<span className="text-danger">*</span>
                    </h3>
                    <input
                        className="contact-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        required
                    />
                    <h3>
                        Shipping Address
                    </h3>

                    <label htmlFor="city">Select City<span className="text-danger">*</span></label>
                    <select
                        className="contact-email"
                        placeholder="Enter Your City"
                        id="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    >
                        <option value="" disabled>Select City</option>
                        {
                            shippingCities.map((v, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={v.name.toLowerCase()}
                                    >
                                        {capitalizeWords(v.name)}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="firstName">First Name<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter Your First Name"
                        className="contact-email"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                    <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter Your Last Name"
                        className="contact-email"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                    <label htmlFor="adress">Address<span className="text-danger">*</span></label>
                    <textarea
                        id="adress"
                        placeholder="Enter Your Address"
                        className="contact-textarea"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                    <label htmlFor="phone">Phone<span className="text-danger">*</span></label>
                    <input
                        type="number"
                        id="phone"
                        placeholder="Enter Your Phone"
                        className="contact-email"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Enter Your Postal Code"
                        className="contact-email"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    />
                    <label htmlFor="postalCode">Current Location</label>
                    <br />
                    <BootButton variant="secondary" onClick={handleCurrentLocation}>Share current location</BootButton>

                    <div className="submit-btton-div">
                        <Link href='/'>Return to cart</Link>
                        <Button title={'Continue To Shipping'} type='submit' />
                    </div>
                </form>
            </div>
            <div className="order-details-main">
                <ShopItemList data={cartData} />
            </div>
        </Container>
    );
};

export default CheckOut;