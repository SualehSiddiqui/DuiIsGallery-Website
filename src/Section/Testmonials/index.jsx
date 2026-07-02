// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// my styles file
import './style.css';
import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Quote1 from "../../Assets/Testimonials/quote1.png";
import Quote2 from "../../Assets/Testimonials/quote2.png";
import MaleIcon from "../../Assets/Testimonials/male-icon.png";
import FemaleIcon from "../../Assets/Testimonials/female-icon.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import Swal from 'sweetalert2';


const TestimonialSlide = ({ icon, name, email, body }) => (
    <>
        <div className='test-icon-div'>
            <img src={icon} alt={`${name}'s icon`} />
        </div>
        <img src={Quote1} className='quote-img quote1-img' alt="quote1-img" />
        <img src={Quote2} className='quote-img quote2-img' alt="quote2-img" />
        <div className='test-details-div'>
            <p>
                {body}
            </p>
            <h2>{name}</h2>
        </div>
    </>
);

const Testimonials = () => {
    const [feedback, setFeedback] = useState([]);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const getData = (approved) => {
        const url = `${import.meta.env.VITE_SERVER_API_URL}/testimonial/${approved}`;
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                setFeedback(res.data.data);
            })
            .catch(error => {
                // Error handler
                if (error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.error || 'Failed to create ledger.',
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

    useEffect(() => {
        getData(true);
    }, []);

    return (
        <>
            {
                feedback?.length > 0 &&
                <div className="testimonials-main">
                    <Container className="testimonials-container">
                        <h1 data-aos="fade-right" data-aos-duration={600}>Clients Feedback</h1>
                        <div className="testimonials-all-div">
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'auto'}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2,
                                    slideShadows: true,
                                }}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                modules={[EffectCoverflow, Pagination]}
                                onSwiper={(swiper) => setSwiperInstance(swiper)}
                                className='test-swipper'
                            >
                                {
                                    feedback.map(v => {
                                        return (
                                            <SwiperSlide key={v._id} className='test-swipper-slide'>
                                                <TestimonialSlide
                                                    icon={v.gender === "male" ? MaleIcon : FemaleIcon}
                                                    name={v.name}
                                                    body={v.message}
                                                    email={v.email}
                                                />
                                            </SwiperSlide>
                                        )
                                    }, [])
                                }
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
                        </div>
                    </Container>
                </div>
            }
        </>

    );
};

export default Testimonials;


