import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { DataContext } from "../context/DataContext";

const Cart = () => {
    const { cart ,handleEmptyCart , handleRemoveFromCart , handleUpdateCartQty} = useContext(DataContext);

    const removeCartItem=(id)=>{
         handleRemoveFromCart(id)
        
    }
    const tax= cart.subtotal.raw > 100 ? "50" :"00";
    // console.log(tax)
   
    return (
        <>
            <div className="cart-page">
                <div className="container">


                    <section className="mt-5 mb-4">
                        {/* sk_test_3020349e9a5f228c8ad715279f346372b7c2c936e7dbd */}
                        {/* pk_30203d92d0c0afa7765cf38f08dfbbd1a02c8ed2233dc */}

                        <div className="row">


                            <div className="col-lg-8">


                                <div className="card wish-list mb-4">
                                    <div className="card-body">

                                        <h5 className="mb-4">Cart (<span>{cart.total_unique_items}</span> items)</h5>
                                        {
                                            cart.line_items.map((val, ind) => {
                                                return (
                                                    <>
                                                     <div className="row mb-4" key={ind}>
                                            <div className="col-md-5 col-lg-3 col-xl-3">
                                                <img src={val.media.source} alt="gg" className="img-fluid cart-img" />

                                            </div>
                                            <div className="col-md-7 col-lg-9 col-xl-9">
                                                <div>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5>{val.name}</h5>

                                                        </div>
                                                        <div>
                                                            <div className="def-number-input number-input safari_only mb-0 w-100">
                                                                <button type="button" class="btn btn-primary" onClick={()=>handleUpdateCartQty(val.id,val.quantity-1)}><i class="fas fa-minus"></i></button>
                                                                <input type="text" style={{ width: '50px', paddingLeft: '17px', height: '45px', fontSize: '20px' }} readOnly value={val.quantity} />
                                                                <button type="button" class="btn btn-primary" onClick={()=>handleUpdateCartQty(val.id,val.quantity+1)}><i class="fas fa-plus"></i></button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <br /><br />
                                                            <button  className="btn btn-primary card-link-secondary small text-uppercase mr-3" onClick={()=>removeCartItem(val.id)}><i
                                                                className="fas fa-trash-alt mr-1"></i> Remove item </button>

                                                        </div>
                                                        <h2 className="mb-0"><span><strong>{val.price.formatted_with_symbol}</strong></span></h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="mb-4" />
                                                    </>
                                                )
                                            })
                                        }
                                       <div className="text-right">
                                       <button className="btn btn-primary " onClick={()=>handleEmptyCart()}>Empty Cart</button>
                                       </div>
                                        
                                        
                                        
                                        

                                    </div>
                                </div>





                            </div>

                            <div className="col-lg-4">


                                <div className="card mb-4">
                                    <div className="card-body">

                                        <h5 className="mb-3">The total amount of</h5>

                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Sub Total
                                                <span>{cart.subtotal.formatted_with_symbol}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping & Tax
                                                {
                                                    cart.subtotal.raw > 100 ?  <span>$50.00</span> : <span>$00.00</span>

                                                   
                                                }
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total Amount </strong>

                                                </div>
                                                <span><strong>${cart.subtotal.raw + parseInt(tax)}.00</strong></span>
                                            </li>
                                        </ul>

                                        <NavLink to="/checkout" className="btn btn-primary btn-block waves-effect waves-light">go to
                                            checkout</NavLink>

                                    </div>
                                </div>




                            </div>


                        </div>


                    </section>


                </div>
            </div>


        </>
    )
}

export default Cart
