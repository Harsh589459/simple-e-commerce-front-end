
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {useState,useContext} from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import useFetch from '../../hooks/useFetch';
import { useParams } from "react-router-dom";
import { Context,hand } from "../../utils/context";


const SingleProduct = () => {
    const {id} = useParams();
    const[quantity,setQuantity] = useState(1);
    const{handleAddToCart}=useContext(Context)
    const {data} = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
    const increment = ()=>{
        setQuantity(prevState=>prevState+1);
    }
    const decrement = ()=>{
        setQuantity(prevState=>{
            if(prevState===1) return 1
            return prevState-1;
        });
        
    }

    if(!data) return;
    const product = data.data[0].attributes;
    return <div className="single-product-main-content">
        <div className="layout">
            <div className="single-product-page">
                <div className="left">
                    <img src={process.env.REACT_APP_DEV_URL + product.img.data[0].attributes.url} alt=""/>
                </div>
                <div className="right">
                    <span className="name">
                        {product.Title}
                    </span>
                    <span className="price">&#8377;{product.Price}</span>

                    <span className="desc">{product.Desc}</span>

                    <div className="cart-buttons">
                        <div className="quantity-buttons">
                            <span onClick={decrement}>-</span>
                            <span>{quantity}</span>
                            <span onClick={increment}>+</span>
                        </div>
                        <button className="add-to-cart-button" onClick={()=>{
                            handleAddToCart(data?.data?.[0],quantity);
                            setQuantity(1);
                        }}>
                            <FaCartPlus size={20} />
                            ADD TO CART
                        </button>
                    </div>

                    <span className="divider" />
                    <div className="info-item">
                        <span className="text-bold">Categoroy:{" "}
                            <span>{product.categories.data[0].attributes.Title}</span>
                        </span>
                        <span className="text-bold">Share:
                        <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                        </span>
                    </div>
                </div>
            </div>
            <RelatedProducts productId={id} categoryId={product.categories.data[0].id}/>
        </div>
    </div>
};

export default SingleProduct;
