import React ,{useContext} from 'react'
import { DataContext } from "../context/DataContext";

import CardData from '../component/CardData';

const Home = () => {
    const  {products, handelCart }  = useContext(DataContext);
     

     const addToCart=(id,qty)=>{
        handelCart(id,qty)

     }

    return (
        <>
        <div className="home">
            <div className="container">
                <div className="row">
                    {
                        products.map((val,ind)=>{
                            return(
                                <>
                                <CardData 
                                key={ind}
                                id={val.id}
                                name={val.name}
                                image={val.media.source}
                                desc={val.description}
                                price={val.price.formatted_with_symbol}
                                addToCart={addToCart}
                                

                                
                                />

                                </>
                            )
                        })
                    }
                    
               
                   

               
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Home
