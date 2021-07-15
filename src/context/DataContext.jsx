import React , { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { commerce } from '../lib/commerce';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [products, setProducts] = useState([])
    const [cart,setCart]=useState([])
    const [checkoutToken, setCheckoutToken] = useState("");
    const [shippingCountries, setShippingCountries] = useState([]);
  // const [shippingCountry, setShippingCountry] = useState('');
  const [order, setOrder] = useState({});
    const fetchProducts = async () => {
        const response = await commerce.products.list();
        
        setProducts(response.data)
        
        
      };
const his=useHistory()

      const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
      };

      const handelCart=async (productId, quantity)=>{
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);

      }
      const handleUpdateCartQty = async (lineItemId, quantity) => {
        const response = await commerce.cart.update(lineItemId, { quantity });
    
        setCart(response.cart);
      };
    
      const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
    
        setCart(response.cart);
      };
    
      const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
      };


      useEffect(() => {
        fetchProducts();
        fetchCart();
      }, [])


      useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            
              
            try{
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            }
            catch{
              his.push('/');
            }
          }
    
          generateToken();
        }
      }, [cart]);
    


      const fetchShippingCountries = async (checkoutTokenId) => {
        const res = await commerce.services.localeListShippingCountries(checkoutTokenId);
        // const res = await commerce.services.localeListCountries(checkoutTokenId);

    
        setShippingCountries(res.countries);
          // // setShippingCountry(Object.keys(res).countries[0]);
          // let con=Object.values(res.countries);
         
          // setShippingCountry(con[0])
          // console.log(res.countries)
           
      };

      useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
      }, [])
       

//  console.log(checkoutToken)


const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};

const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);
    console.log(incomingOrder)

    refreshCart();
  } catch (error) {
    console.log(error.data.error.message);
  }
};




  

  return (
    <>
      <DataContext.Provider value={{products,cart,handelCart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart , shippingCountries , checkoutToken , handleCaptureCheckout }} >
        {props.children}
      </DataContext.Provider>
    </>
  );
};
