import { useParams } from "react-router-dom";
import "./style.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { InputNumber } from 'antd';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Carousel, Image } from 'antd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button, Navbar, Footer } from "../../Components";
import axios from "axios";
import Swal from "sweetalert2";


const CustomPrevArrow = ({ onClick }) => (
    <div className="product-carousel-arrows left-arrow" onClick={onClick}>
        <IoIosArrowBack />
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div className="product-carousel-arrows right-arrow" onClick={onClick}>
        <IoIosArrowForward />
    </div>
);

const Products = ({ setShowSpinner }) => {
    const [item, setItem] = useState({});
    const { id } = useParams();

    const getSpecificItem = (id) => {
        setShowSpinner(true);
        const url = `${import.meta.env.VITE_SERVER_API_URL}/item/one/${id}`
        axios.get(url)
            .then(res => {
                const item = res.data.item;
                setItem(item)
                setMainImgUrl(item.imgUrl[0])
                for (let v in item.shades) {
                    if (item.shades[v]) {
                        setShade(`${v}`)
                        break
                    }
                }
                setShowSpinner(false);
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
            });
    }

    useEffect(() => {
        getSpecificItem(id);
    }, [id]);

    const [shade, setShade] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [mainImgUrl, setMainImgUrl] = useState(item.imgUrl && item.imgUrl[0]);

    const handleAddToCart = (item, quantity, shade) => {
        const cardData = localStorage.getItem('cart')
        const cartItem = item?.shades?.length > 0 ? {
            quantity,
            shade,
            item: item,
            totalPrice: (item.price * quantity),
        } : {
            quantity,
            item: item,
            totalPrice: (item.price * quantity),
        }
        if (cardData) {
            const cartPreviousData = JSON.parse(cardData);
            const checkItemExist = cartPreviousData.filter(v => v.item._id === cartItem.item._id);
            if (!checkItemExist.length) {
                localStorage.setItem("cart", JSON.stringify([...cartPreviousData, cartItem]));
                Swal.fire({
                    title: "Added to Cart",
                    icon: "success",
                    html: `Item has been added to cart`,
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: `Continue Shopping`,
                    cancelButtonText: `<a href="/checkOut" style="text-decoration: none; color: white;">Checkout</a>`,
                });
            } else {
                Swal.fire({
                    title: "Already Exist",
                    icon: "error",
                    html: `Item already exist in the cart`,
                });
            }
        } else {
            localStorage.setItem("cart", JSON.stringify([cartItem]));
            Swal.fire({
                title: "Added to Cart",
                icon: "success",
                html: `Item has been added to cart`,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `Continue Shopping`,
                cancelButtonText: `<a href="/checkOut" style="text-decoration: none; color: white;">Checkout</a>`,
            });
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <Container className="products-div-container">
                    <div className="img-div-container">
                        {item.imgUrl && item.imgUrl.map((v, i) => {
                            return (
                                <div className={`img-div ${i !== 0 ? 'mt-2' : ''}`} key={i}>
                                    <img
                                        src={v.url}
                                        alt={v.public_id}
                                        onClick={() => setMainImgUrl(v)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="main-img-div">
                        <Image
                            width={'100%'}
                            height={'100%'}
                            src={mainImgUrl?.url}
                            alt={mainImgUrl?.public_id}
                        />
                    </div>
                    <Carousel
                        className="product-carousel-div"
                        infinite={true}
                        autoplay={true}
                        fade={true}
                        autoplaySpeed={4000}
                        arrows
                        prevArrow={<CustomPrevArrow />}
                        nextArrow={<CustomNextArrow />}
                    >
                        {item.imgUrl && item.imgUrl.map((v, i) => {
                            return (
                                <div className="product-carousel-slide" key={i}>
                                    <img
                                        src={v?.url}
                                        alt={v?.public_id}
                                    />
                                </div>
                            )
                        })}
                    </Carousel>
                    <div className="product-detail-div">
                        <h1>{item.name}</h1>
                        <h4>Rs {item.price && item.price.toLocaleString('en-PK')}</h4>
                        {
                            item.discountPercentage > 0 ?
                                <h6>
                                    <span>Rs {item.priceBeforeDiscount && item.priceBeforeDiscount.toLocaleString('en-PK')}</span> -{item.discountPercentage}%
                                </h6>
                                :
                                <></>
                        }
                        <p>SKU : {item._id}</p>
                        {item?.shades?.length > 0 && <h5>Shades</h5>}
                        <div className="d-flex mb-3 shades-div">
                            {item?.shades?.map(value => (
                                <span
                                    className={shade === value ? 'active-size' : ''}
                                    onClick={() => setShade(value)}
                                >
                                    {value}
                                </span>
                            ))}
                        </div>
                        <div className="add-to-cart-btn-div mt-4">
                            <InputNumber
                                min={1}
                                max={50}
                                value={quantity}
                                onChange={(e) => setQuantity(e)}
                                className="quanitity-input"
                            />
                            <Button addclass="add-to-cart-btn" title="Add To Cart" onClick={() => {
                                if (item.status) {
                                    handleAddToCart(item, quantity, shade)
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Out of Stock...",
                                        text: "This item is currently out of stock",
                                    });

                                }
                            }} />
                        </div>
                        <div className="mt-4">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Product Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.description}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Product Specifications</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.specification}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography>Care Instructions</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.careInstruction}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography>Shipping & Return</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.shippingAndReturn}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="final-card-div mt-4">
                            <div className="final-img-div">
                                <img src={item.imgUrl && item.imgUrl[0].url} alt={item.imgUrl && item.imgUrl[0].public_id} />
                            </div>
                            <div className="final-details-div">
                                <div>

                                    <h4>EVELYN OFFWHITE</h4>
                                    <div className="mb-2">
                                        {
                                            item?.shades?.length > 0 &&
                                            <span>
                                                <strong className="me-2">
                                                    Shade
                                                </strong>
                                                "{shade}"
                                            </span>
                                        }
                                        <br />
                                        <span>
                                            <strong className="me-2">
                                                Quantity
                                            </strong>
                                            "{quantity}"
                                        </span>
                                    </div>
                                </div>
                                <Button title='Add To cart' onClick={() => {
                                    if (item.status) {
                                        handleAddToCart(item, quantity, shade)
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Out of Stock...",
                                            text: "This item is currently out of stock",
                                        });

                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
};

export default Products;