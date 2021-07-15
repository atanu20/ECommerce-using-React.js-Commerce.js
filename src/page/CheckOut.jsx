import React , { useContext , useEffect ,useState } from 'react'
import { DataContext } from "../context/DataContext";
import { commerce } from '../lib/commerce';

const CheckOut = () => {
    const {  checkoutToken , handleCaptureCheckout  } = useContext(DataContext);
    
    // const tax= cart.subtotal.raw > 100 ? "50" :"00";
    const [country,setCountry] = useState("US")
    const [mysubdivisions, setMySubdivisions] = useState([])

    const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

    const [shippingaddress, setShippingAddress] = useState({
        name:"",
        phone:"",
        email:"",
        devisions:"",

        shipping:"",       
        address:""


    })
    let val ="";


    if(shippingOptions[0])
    {
         val=`(${country}-${shippingOptions[0].price.formatted_with_symbol})`
    }


   

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        // console.log(subdivisions)
        setMySubdivisions(subdivisions)
      };



    const devHandel=(e)=>{
        setCountry(e.target.value)
        fetchSubdivisions(e.target.value)
    }


    const InputHandel=(e)=>{
        const {name,value}=e.target;
        setShippingAddress((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
   const onSub=(e)=>{
        e.preventDefault()
        const data={

            line_items: checkoutToken.live.line_items,
        customer: { name:shippingaddress.name,phone:shippingaddress.phone, email: shippingaddress.email },
        shipping: { name: 'International', address:shippingaddress.address, country:country,state:shippingaddress.devisions },
        fulfillment: { shipping:shippingaddress.shipping },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: 'paym_bWZ3l8QMGwkpEQ',
          },
        },

          

        }


        handleCaptureCheckout(checkoutToken.id, data)


        // console.log(data)
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    
        setShippingOptions(options);
        if(options[0])
        {
            setShippingOption(options[0].id);
        }
         
        // console.log(options)
      };

      useEffect(() => {
        if (shippingaddress.devisions) fetchShippingOptions(checkoutToken.id, country, shippingaddress.devisions);
      }, [shippingaddress.devisions,country]);




     

    return (
        <>
        <div className="checkout">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-12 mx-auto">
                        <div className="card p-3">
                            <h2 className="text-center">Fill Your Details</h2>
                            <br />
                        <form onSubmit={onSub} >

                <div class="form-row">
                <div class="col">
                    <div class="md-form md-outline mt-0">
                    <input type="text" id="materialRegisterFormFirstName" class="form-control" name="name" required onChange={InputHandel} />
                    <label for="materialRegisterFormFirstName">FullName</label>
                    </div>
                </div>
                <div class="col">
                    <div class="md-form md-outline mt-0">
                    <input type="tel" id="materialRegisterFormPhone" class="form-control" name="phone" required  onChange={InputHandel} />
                    <label for="materialRegisterFormPhone">Phone Number</label>
                    </div>
                </div>
                </div>
                <div className="form-row">
                    <div className="col">
                    <div class="md-form md-outline mt-0">
                    <input type="email" id="materialRegisterFormEmail" class="form-control" name="email"  required onChange={InputHandel} />
                    <label for="materialRegisterFormEmail">Email Address</label>
                    </div>
                    </div>
                </div>
                
                <div className="form-row">
               
                     <div className="col">
                        
                        <select class="browser-default custom-select" name="country" required onChange={devHandel}>
                    
                        
                <option value="US">US</option>
                <option value="IN">IND</option>
                
                   
                    </select>
                        </div>
                  
                    <div className="col">
                        
                    <select class="browser-default custom-select" name="devisions" required onChange={InputHandel}>
                        <option value="">select state</option>
               
                {
                    Object.entries(mysubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                      ))
                }
               
                </select>
                    </div>
                </div>
                <br />
                <div className="form-row">
                <div className="col">
                        
                <div class="md-form md-outline mt-0">
                    <input type="text" id="shipping" class="form-control" name="shipping" value={val} required onChange={InputHandel} readOnly />
                   
                    </div>
                </div>
                </div>
                
            
                <div className="form-row">
                    <div className="col">
                    <div class="md-form md-outline mt-0">
                    
                    <textarea class="form-control" id="exampleFormControlTextarea3" rows="3" name="address" required onChange={InputHandel}></textarea>
                    <label for="exampleFormControlTextarea3">Add Address</label>
                    </div>
                    
                    </div>
                </div>

                <div className="text-right">
                    <button type="submit" className="btn btn-primary " >
                    
                    {/* {
                                                    cart.subtotal.raw > 100 ?  <span style={{fontSize:'18px'}}> ${cart.subtotal.raw + parseInt(tax)} </span> : <span> {cart.subtotal.raw}</span>

                                                   
                                                } */}
                                                Pay Now
                     </button>
                 </div>
                



</form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
            
        </>
    )
}

export default CheckOut
