import "./Products.scss";
import Product from './Product/Product'
import { useEffect } from "react";
const Products = ({ products, innerPage, headingText }) => {
    useEffect(()=>{
        console.log('page',products)
    })
    return <div className="products-container">
        {!innerPage && <div className="sec-heading">
            {headingText}
        </div>}
        <div className="products">
            {products?.data?.map(item => (
               
                    <Product key={item.id}
                        id={item.id} data={item.attributes}/>


            ))}
        </div>
    </div>
};

export default Products;
