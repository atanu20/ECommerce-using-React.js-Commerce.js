import React from 'react'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import Home from './page/Home';
import Cart from './page/Cart';
import CheckOut from './page/CheckOut';
 import Navbar from './component/Navbar'
import './App.css'


import { DataProvider } from "./context/DataContext";


const App = () => {
  return (
    <>
    <DataProvider>
      <BrowserRouter>
    
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={CheckOut} />
       
      </Switch>
  
      
    
    
    </BrowserRouter>
    </DataProvider>

    

      
    </>
  )
}

export default App
