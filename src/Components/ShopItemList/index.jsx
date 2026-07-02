import { Link } from "react-router-dom";
import "./style.css";

const ShopItemList = ({ data }) => {
    const userDetails = localStorage.getItem('userDetails');
    const userDetailsObj = userDetails && (typeof userDetails === 'string' ? JSON.parse(userDetails) : '');
    let cartTotal = 0;
    return (
        <>
            <ul className="main-products-list">
                {
                    data && data.map((v, i) => {
                        cartTotal = cartTotal + Number(v.totalPrice);
                        return (
                            <li className="order-prodcts-list mt-4 " key={i}>
                                <div className="order-product-img-div">
                                    <img src={v.item.imgUrl && v.item.imgUrl[0].url} alt={v.item.imgUrl && v.item.imgUrl[0].public_id} />
                                    <div className="order-quantity-div">{v.quantity}</div>
                                </div>
                                <div className="order-products-details">
                                    <p>
                                        <Link style={{ color: 'black', textDecoration: 'none' }}>
                                            {v.item.name}
                                        </Link>
                                        <br />
                                        <span>{v.size}</span>
                                    </p>
                                    <p>
                                        Rs {v.totalPrice}
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="order-total-list">
                <p>
                    Sub Total <span> Rs {cartTotal.toLocaleString('en-PK')}</span>
                </p>
                <p>
                    Shipping <span>Rs {userDetailsObj && userDetailsObj.shippingFee || "Select city to caluculate shipping fee"}</span>
                </p>
                <h4>
                    Total
                    <span>
                        <span>PKR</span>
                        Rs {
                            userDetailsObj && userDetailsObj.shippingFee ?
                                (cartTotal + Number(userDetailsObj.shippingFee)).toLocaleString('en-PK')
                                :
                                cartTotal.toLocaleString('en-PK')}
                    </span>
                </h4>
                <p className="tax-text">
                    Including Rs 2134.3 in taxes
                </p>
            </div>
        </>
    );
};

export default ShopItemList;