import "./style.css";

const Button = (props) => {
    const { title, addclass, } = props;
    return (
        <button className={`all-products-button ${addclass}`} {...props}>{title}</button>
    );
};

export default Button;