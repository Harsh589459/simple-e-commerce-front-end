import "./Product.scss";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const Product = ({ id, data }) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log('data', data.img.data[0].attributes.url);
    })
    return <div className="product-card" onClick={()=>navigate("/product/" +id)}>
        <div className="thumbnail">
         <img src={process.env.REACT_APP_DEV_URL + data.img.data[0].attributes.url} />
        </div>

        <div className="product-details">
            <span className="name">
                {data.Title}
            </span>
            <span className="price">&#8377;{data.Price}</span>
        </div>


    </div>
};

export default Product;
