import "./style.css";
// core version + navigation, pagination modules:
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Components";

const Section3 = ({ hd, data, btnLink }) => {
    // State to hold Swiper instance
    const [swiperInstance, setSwiperInstance] = useState(null);
    const navigate = useNavigate();
    const [hoveredCards, setHoveredCards] = useState({});

    const handleMouseEnter = (id) => {
        setHoveredCards((prev) => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setHoveredCards((prev) => ({ ...prev, [id]: false }));
    };

    return (
        <div className='main-sec3-div'>
            <Container className='sec3-container'>
                <div className="sec3-container-hd-div">
                    <hr />
                    <h1>{hd}</h1>
                    <hr />
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={10}
                    navigation
                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                    autoplay={{
                        delay: 5000, // Delay between slides in ms (e.g., 2500ms = 2.5 seconds)
                        disableOnInteraction: false, // Keep autoplay running even if user interacts with the Swiper
                    }}
                    breakpoints={{
                        320: { // mobile devices
                            slidesPerView: 1,
                        },
                        576: { // small tablets
                            slidesPerView: 3,
                        },
                        1200: { // desktops
                            slidesPerView: 4,
                        }
                    }}
                    className='swiperr-main'
                >
                    {data.map((v, i) => (
                        <SwiperSlide className='slides-div' key={v._id}>
                            <Link to={`products/${v._id}`} className="slides-div-link">
                                {
                                    !v.status &&
                                    <div className="out-of-stock-hd">
                                        <h1>Out of Stock</h1>
                                    </div>
                                }
                                <div
                                    className={`sub-slides-div-link ${hoveredCards[v._id] ? 'hovered' : ''}`}
                                    onMouseEnter={() => handleMouseEnter(v._id)}
                                    onMouseLeave={() => handleMouseLeave(v._id)}
                                >
                                    <img
                                        src={v.imgUrl.length > 1 ? (hoveredCards[v._id] ? v.imgUrl[1].url : v.imgUrl[0].url) : v.imgUrl[0].url}
                                        alt="img"
                                    />
                                </div>
                                <div>
                                    <p>{v.name}</p>
                                    <div className="prices-div">
                                        <span className="product-price">Rs {v.price && v.price.toLocaleString('en-PK')}</span>
                                        {
                                            v.discountPercentage > 0 ?
                                                <span>
                                                    <span className="product-price-before-disc">Rs {v.priceBeforeDiscount && v.priceBeforeDiscount.toLocaleString('en-PK')}</span>
                                                    <span className="product-disc-per"> -{v.discountPercentage}%</span>
                                                </span> :
                                                <></>
                                        }
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                    <button
                        className='previousButton'
                        onClick={() => {
                            if (swiperInstance) {
                                swiperInstance.slidePrev();
                            }
                        }}
                    >
                        <IoIosArrowBack />
                    </button>
                    <button
                        className='nextButton'
                        onClick={() => {
                            if (swiperInstance) {
                                swiperInstance.slideNext();
                            }
                        }}
                    >
                        <IoIosArrowForward />
                    </button>
                </Swiper>
                <div>
                    <Button onClick={e => navigate(btnLink)} title={"view all products"} />
                </div>
            </Container>
        </div>
    );
};

export default Section3;
