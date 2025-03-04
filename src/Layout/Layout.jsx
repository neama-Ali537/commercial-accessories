import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import CartsDetails from '../CartsDetails/CartsDetails';

import ShoppingCardProvider from '../ShoppingContext/ShoppingCardContext';

export default function Layout({userData , setUserData}) {
    // spichail to shoping card at navbar
    const [showCard , setShowCard]= useState(false);
  let navigate= useNavigate();
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')
  }
  return (<>
  <ShoppingCardProvider>
<Navbar opencart={()=> setShowCard(true)} logout={logOut} userData={userData} />
  {showCard ? <CartsDetails />: 

<div className='container pt-5'>
<Outlet></Outlet>
</div> }
  </ShoppingCardProvider>
<Footer />
  </>
  )
}
