
import React ,{useContext,useState} from 'react'


import { DataContext } from "../context/DataContext";
const CardData = (props) => {
    const [present,setPresent]=useState(false)
    const  {cart }  = useContext(DataContext);
    // let check=cart.line_items;
    //   let len=Object.keys(check).length
     
    
    // if(len)
    // {
    //     for(let i=0;i<len;i++)
    //     {
    //          if(cart.line_items[i].product_id == props.id)
    //          {
    //            console.log("hoo")
    //          }
           
    //     }
        
    // }
    // else{
    //     return ;
    // }
    return (
        <>
         <div className="col-lg-4 col-md-6 col-12  mb-3">
                    <div className="card ">

                    <img className="img-fluid w-100 " src={props.image} alt="Sample"  className="img-fluid " />

                            <div className="card-body text-center">

                            <h5>{props.name}</h5>
                            <p>{props.desc.replace( /(<([^>]+)>)/ig, '')}</p>
                            
                            
                           
                            <h3 className="text-danger mr-1">{props.price}</h3>
                            
                            <button type="button" className="btn btn-primary btn-sm mr-1 mb-2" disabled={present} onClick={()=>props.addToCart(props.id,1)}>
                                <i className="fas fa-shopping-cart pr-2"></i>Add to cart
                            </button>
                            

                            </div>

              </div>
                   


                    </div>

            
        </>
    )
}

export default CardData
