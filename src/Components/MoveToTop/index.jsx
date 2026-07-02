import "./style.css";
import { IoIosArrowUp } from "react-icons/io";

const MoveToTop = () => {
    const scrollToTop = () =>{
        window.scrollTo(0,0);
    };

    return (
        <div className='top-icon-div'>
            <IoIosArrowUp onClick={scrollToTop}/>
        </div>
    );
};

export default MoveToTop;