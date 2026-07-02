import "./style.css";
import { Carousel } from 'antd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CarouselImg1 from "../../Assets/Hero/carousel1.jpg";
import CarouselImg2 from "../../Assets/Hero/carousel2.jpg";
import CarouselImg3 from "../../Assets/Hero/carousel3.jpg";
import CarouselImg4 from "../../Assets/Hero/carousel5.png";

const CustomPrevArrow = ({ onClick }) => (
    <div className="main-hero-arrows left-arrow" onClick={onClick}>
        <IoIosArrowBack />
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div className="main-hero-arrows right-arrow" onClick={onClick}>
        <IoIosArrowForward />
    </div>
);


const Hero = () => {
    return (
        <Carousel
            className="main-hero-div"
            infinite
            autoplay
            fade
            arrows
            autoplaySpeed={2000}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
        >
            <div className="main-hero-slide">
                <img
                    src={CarouselImg1}
                    alt={'img-1'}
                />
            </div>
            <div className="main-hero-slide">
                <img
                    src={CarouselImg2}
                    alt={'img-2'}
                />
            </div>
            <div className="main-hero-slide">
                <img
                    src={CarouselImg3}
                    alt={'img-3'}
                />
            </div>
            <div className="main-hero-slide">
                <img
                    src={CarouselImg4}
                    alt={'img-4'}
                />
            </div>

        </Carousel>
    );
};

export default Hero;