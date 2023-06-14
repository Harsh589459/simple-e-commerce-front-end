import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import prod from '../../../assets/products/earbuds-prod-1.webp';
import { useContext, useEffect } from "react";
import { Context } from "../../../utils/context";
const CartItem = () => {
    const { cartItems, handleAddToCart, handleRemoveFromCart,handleCartProductQuantity } = useContext(Context);

    useEffect(()=>{
        console.log(cartItems);
    },[])
    return (
        <div className="cart-products">
            {cartItems.map(item => (
                <div className="cart-product">
                    <div className="image-container">
                        <img
                            src={
                                process.env.REACT_APP_DEV_URL +
                                item?.attributes?.img?.data?.[0]?.attributes?.url
                            }
                       alt="" />                </div>
                    <div className="prod-details">
                        <span className="name">
                            {item.attributes.Title}
                        </span>
                        <MdClose className="close-btn" onClick={()=>handleRemoveFromCart(item)} />
                        <div className="quantity-buttons">
                            <span onClick={()=>handleCartProductQuantity('dec',item)}>-</span>
                            <span>{item.attributes.quantity}</span>
                            <span onClick={()=>handleCartProductQuantity('inc',item)}>+</span>
                        </div>
                        <div className="text">
                            <span>{item.attributes.quantity}</span>
                            <span>x</span>
                            <span className="highlight">&#8377;{item.attributes.Price*item.attributes.quantity}
                            </span>
                        </div>
                    </div>
                </div>

            ))}

        </div>
    )
};

export default CartItem;
