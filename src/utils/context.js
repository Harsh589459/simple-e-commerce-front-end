import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Context = createContext();

const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubtotal, setCartSubTotal] = useState(0);
    const location = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
        //when we move from one page to other it should start from start
    },[location])
    useEffect(() => {
        let count = 0;
        cartItems.map((item)=>(count+=item.attributes.quantity))
        setCartCount(count);

        let subTotal = 0;
        cartItems.map((item)=>(subTotal+=item.attributes.Price * item.attributes.quantity));
        setCartSubTotal(subTotal);

    }, [cartItems])

    const handleAddToCart = (product, quantity) => {
        //shallow copy of cart items
        let items = [...cartItems];//it contains cart items
        //added product index
        let index = items.findIndex(p => p.id === product.id);
        //check if product is already added or not
        if (index !== -1) {//if product is already added into cart
            items[index].attributes.quantity += quantity
        } else {
            //if product is not added in cart
            product.attributes.quantity = quantity;
            items = [...items, product];
        }
        setCartItems(items);
    }
    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items.filter(p => p.id !== product.id);
        setCartItems(items)

    }
    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems]
        let index = items.findIndex(p => p.id === product.id);
        if (type === 'inc') {
            items[index].attributes.quantity+=1;
        }
        else if(type==='dec'){
            if(items[index].attributes.quantity===1) return;
            items[index].attributes.quantity-=1;
        }

        setCartItems(items);
    }
    return (
        <Context.Provider value={{
            categories, setCategories, products, setProducts, cartItems, setCartItems, cartCount, setCartCount, cartSubtotal, setCartSubTotal, cartSubtotal, setCartSubTotal, handleAddToCart, handleRemoveFromCart, handleCartProductQuantity
        }}>
            {children}
        </Context.Provider>
    )

}
export default AppContext;