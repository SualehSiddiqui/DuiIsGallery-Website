import "./style.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Flag from "../../Assets/Navbar/Flag_of_Pakistan.svg"
import Menu from "../../Assets/Navbar/menu.png"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ImCross } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import MyButton from "../../Components/Button/index.jsx";
import { InputNumber } from 'antd';
import axios from "axios";
import Logo from "../../Assets/logo.png";
import Swal from "sweetalert2";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [categoryOptions, setCategoryOptions] = useState([]);

    const getNaveItem = (status) => {
        const url = `${import.meta.env.VITE_SERVER_API_URL}/category/${status}`;
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.data.length > 5) {
                    setCategoryOptions(res.data.data.slice(0, 3));
                } else {
                    setCategoryOptions(res.data.data);
                }
            })
            .catch(error => {
                // Error handler
                if (error.response) {
                    console.log('Error response:', error.response.data);
                } else if (error.request) {
                    console.log('Error request:', error.request);
                } else {
                    console.log('Error message:', error.message);
                }
            })
    };

    useEffect(() => {
        getNaveItem(true);
    }, []);

    const [openCart, setOpenCart] = useState(false);

    const toggleCart = (newOpen) => () => {
        setOpenCart(newOpen);
    };
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: "300px" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem >
                    <ListItemButton>
                        <Link className="logo-link" to={"/"}>
                            <img src={Logo} alt="Logo_img" />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ backgroundColor: "black", height: "2px" }} />
                {categoryOptions && categoryOptions.map((v, index) => (
                    <ListItem key={v._id}>
                        <Link
                            style={{
                                textTransform: "uppercase",
                                width: "100%",
                                height: "40px",
                                display: "flex",
                                alignItems: "center"
                            }}
                            className={`nav-links ${location.pathname === v.link ? "active-links" : ""}`}
                            to={`/collection/${v.name.replaceAll(" ", "_")}`}
                        >
                            {v.name}
                        </Link>
                    </ListItem>
                ))}
                <ListItem>
                    <Link
                        style={{
                            textTransform: "uppercase",
                            width: "100%",
                            height: "40px",
                            display: "flex",
                            alignItems: "center"
                        }}
                        className={`nav-links ${location.pathname === '/profile' ? "active-links" : ""}`}
                        to={`/profile`}
                    >
                        Profile
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || []);


    const deleteThisItem = (index) => {
        let newCart = [...cartData];
        newCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartData(newCart)
    };

    const updateThisItem = (index, quantity) => {
        let newCart = [...cartData];
        newCart[index].quantity = quantity;
        newCart[index].totalPrice = quantity * newCart[index].item.price;
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartData(newCart)
    };

    let cartTotal = 0;

    const handleCheckout = () => {
        const localUser = localStorage.getItem('user')
        setOpenCart(false);
        // Check if cart is empty and exit if it is
        if (cartData.length === 0) {
            Swal.fire({
                title: "Empty Cart",
                icon: "error",
                html: `Cannot proceed with empty card`,
                showCloseButton: true,
                showCancelButton: true,
            })
            return; // Stop further execution
        }
        if (cartData.length > 0 && !localUser) {
            Swal.fire({
                title: "Checking Out",
                icon: "info",
                html: `
                            Create an account to easily track your orders and enjoy exclusive deals
                            and offers available only to registered customers. Stay updated on the 
                            latest promotions and make your shopping experience even better!
                        `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `<a href="/login" style="text-decoration: none; color: white;">Create Account</a>`,
                cancelButtonText: `<a href="/checkOut" style="text-decoration: none; color: white;">Continue Without Account</a>`,
            });
        } else {
            navigate('/checkout')
        }
    }

    const CartList = (
        <Box sx={{ width: "350px", height: "100%", }} role="presentation">
            <List sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <ListItem sx={{ width: "100%", height: "70%" }}>
                    <List sx={{ width: "100%", height: "100%" }}>
                        <ListItem
                            className="cart-main-hd"
                        >
                            <ListItemButton >
                                <h1>Your Cart</h1>
                            </ListItemButton>
                            <ListItemButton
                                className="cart-close-button"
                                onClick={toggleCart(false)}
                            >
                                <ImCross />
                            </ListItemButton>
                        </ListItem>
                        <List sx={{ width: "100%", height: "90%", overflow: "auto" }}>
                            {
                                cartData.length === 0 ?
                                    <ListItem>
                                        <p>
                                            No Items
                                        </p>
                                    </ListItem>
                                    :
                                    cartData.map((v, i) => {
                                        cartTotal = cartTotal + Number(v.totalPrice);
                                        return (
                                            <ListItem key={v._id}>
                                                <div className="cart-items-div">
                                                    <div className="item-img-div">
                                                        <img src={v.item.imgUrl && v.item.imgUrl[0].url} alt={v.item.imgUrl && v.item.imgUrl[0].public_id} />
                                                    </div>
                                                    <div className="cart-item-detail-div">
                                                        <button className="delete-btn" onClick={() => deleteThisItem(i)}>
                                                            <MdDeleteOutline size={26} />
                                                        </button>
                                                        <div>
                                                            <p className="cart-sku-text">SKU: {v.item._id}</p>
                                                            <h6> {v.item.name}</h6>
                                                            <p>Size: {v.size}</p>
                                                        </div>
                                                        <div className="quantity-price-div">
                                                            <InputNumber
                                                                min={1}
                                                                max={50}
                                                                value={v.quantity}
                                                                className="quanitity-input"
                                                                placeholder="Quantity"
                                                                onChange={(e) => {
                                                                    updateThisItem(i, e)
                                                                }}
                                                            />
                                                            <h6>
                                                                Rs {v.totalPrice.toLocaleString('en-PK')}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListItem>
                                        )
                                    })
                            }
                        </List>
                    </List>
                </ListItem>
                <ListItem sx={{ width: "100%", height: "30%" }}>
                    <List sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <ListItem sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start"
                        }}>
                            <p style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",

                            }}>
                                Shipping:
                                <strong>Calculated in the Checkout</strong>
                            </p>
                            <p style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",

                            }}>
                                Subtotal (incl GST):
                                <strong>Rs {cartTotal.toLocaleString('en-PK')}</strong>
                            </p>
                            <p style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",

                            }}>
                                Order Total:
                                <strong>Rs {cartTotal.toLocaleString('en-PK')}</strong>
                            </p>
                        </ListItem>
                        <ListItem>
                            <MyButton
                                title={'Check Out'}
                                style={{ width: "100%" }}
                                onClick={handleCheckout}
                            />
                        </ListItem>
                    </List>
                </ListItem>
            </List >
        </Box >
    );

    return (
        <div className="main-nav">
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <Drawer open={openCart} anchor={"right"} onClose={toggleCart(false)}>
                {CartList}
            </Drawer>
            <Container>
                <div className="upper-nav">
                    <button onClick={toggleDrawer(true)} className="hum-burger-icon" >
                        <img src={Menu} alt={"Menu Icon"} />
                    </button>
                    <p className="logo-div">
                        <Link to={'/'}>
                            <img src={Logo} alt={"Menu Icon"} />
                        </Link>
                    </p>
                    <div className="second-div">
                        <Link to="/profile" aria-label="User Profile" className="nav-second-link profile-icon">
                            <FiUser />
                        </Link>
                        <Link onClick={toggleCart(true)} aria-label="Shopping Cart" className="nav-second-link">
                            <RiShoppingCart2Line />
                        </Link>
                        <div></div>
                        <span><img src={Flag} alt="flag" /> PKR</span>
                    </div>
                </div>
                <div className="lower-div">
                    <ul>
                        <li>
                            <Link className={`nav-links ${location.pathname === 'new arrival'.replaceAll(" ", "_") ? "active-links" : ""}`} to={`/collection/${'New Arrival'.replaceAll(" ", "_")}`}>
                                New Arrival
                            </Link>
                        </li>
                        {categoryOptions && categoryOptions.map((v, i) => {
                            return (
                                <li key={v._id}>
                                    <Link className={`nav-links ${location.pathname === v.name.replaceAll(" ", "_") ? "active-links" : ""}`} to={`/collection/${v.name.replaceAll(" ", "_")}`}>
                                        {v.name}
                                    </Link>
                                </li>
                            )
                        })}
                        <li>
                            <Link className={`nav-links ${location.pathname === 'fragnances' ? "active-links" : ""}`} to={`/fragnances`}>
                                Zarovia Fragnances
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container >
        </div >
    );
};

export default Navbar;