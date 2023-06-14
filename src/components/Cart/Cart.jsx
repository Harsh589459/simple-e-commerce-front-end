import "./Cart.scss";
import { MdClose } from "react-icons/md";
import CartItem from './CartItem/CartItem'
import { useContext } from "react";
import { Context } from "../../utils/context";
import {BsCartX} from 'react-icons/bs'
import {loadStripe} from "@stripe/stripe-js"

import { makePaymentRequest } from "../../utils/api";

const Cart = ({ setShowCart }) => {

    const {cartItems,cartSubtotal} = useContext(Context);

    const stripePromise = loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );
    
    const handlePayment = async ()=>{
        console.log("ggjg")
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
      
    
    return (
        <div className="cart-panel">
            <div className="opac-layer">
            </div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span className="close-btn" onClick={() => setShowCart(false)}>
                        <MdClose />
                        <span className="text">Close</span>
                    </span>
                </div>
               {!cartItems?.length && <div className="empty-cart">
                <BsCartX/>
                <span> Not products in the cart</span>
                <button className="return-cta">RETURN TO SHOP</button>
            </div>}

           {cartItems.length && <>
                <CartItem />
                <div className="cart-footer">
                    <div className="subtotal">
                        <span className="text">
                            Subtotal:
                        </span>
                        <span className="text total">
                            &#8377;{cartSubtotal}
                        </span>
                    </div>
                    <div className="button" onClick={handlePayment}>
                        <div className="checkout-cta">
                            checkout
                        </div>
                    </div>
                </div>
            </>}
            </div>
        </div>
    )
};

export default Cart;
