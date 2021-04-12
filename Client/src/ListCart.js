import React, { useState,useEffect } from 'react'
import './style/ListCart.scss'
import Cart from './page/Cart';
import NavHeader from './NavHeader';
import Axios from 'axios';

import {ReactComponent as EmptyCart} from './image/emptycart.svg';


const ListCart = () => {
    const [cart,setCart]=useState([]);

    var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
    var usercart = JSON.parse(localStorage.getItem('datacart'));
    
    //Get data upon accessing Cart menu
    useEffect(() => {
      var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
      var usercart = JSON.parse(localStorage.getItem('datacart'));

      if(dataUser === null){
        } else if(dataUser !== null){
          const userID = dataUser[0].userID;
          Axios.post("http://localhost:3001/retrieveCart",
          {
            userID: userID
          }).then((response) => {
          if(response.data.message ){
            console.log(response.data.message)
          }else {
            setCart(response.data)
            localStorage.setItem('datacart', JSON.stringify(response.data));
          }
        });
      }

      if(localStorage.getItem('datacart') !== null && localStorage.getItem('datacart').length === 0){
        localStorage.removeItem('datacart')
      }
    }, [])

    //Delete Cart data based on ID
    const deleteCart = (id) => {
          Axios.delete(`http://localhost:3001/deleteCart/${id}`).then((response) => {
          setCart(
            cart.filter((cart) => {
              return cart.id !== id;
            })
          );
        });
        const datacart = JSON.parse(localStorage.getItem('datacart'));
        const filtered = datacart.filter(datacart => datacart.id !== id);
        localStorage.setItem('datacart', JSON.stringify(filtered));
    };
    
    if(dataUser !== null && usercart !== null && JSON.parse(localStorage.getItem('datacart')).length !== 0){
    return (
        <div>
          <NavHeader />
          <div className="list-cart__container">
            <div className="list-cart-item__container">
                {cart.map(cart => (
                  <div className="list-cart-item__wrapper" key={cart.id}>
                  <Cart userID={cart.userID}  
                      id={cart.id}
                      kodeBarang={cart.kodeBarang} 
                      namaBarang={cart.namaBarang} 
                      harga={cart.harga}
                      qty={cart.qty}
                      total={cart.total}/>
                      <button onClick={() => {deleteCart(cart.id);}}className="list-cart-item__button__delete"> Remove </button>
                  </div>
                ))}  
            </div> 
            <div className="list-cart-detil__container">
                <h5>Detail Order</h5>
                {cart.map(cart => (
                  <p>Total : Rp. {cart.total}</p>
                ))}  
            </div>
          </div>
      </div>
    )} else if (dataUser === null || usercart === null  ) {
    return (
      <div>
        <NavHeader />
        <div className="list-cart__container">
          <div className="list-cart__wrapper">
            <EmptyCart className="list-cart__emptycart-image"/>
            <h1 className="list-cart__warning-text">Cart Anda Kosong</h1>
          </div>
        </div> 
      </div>
    )
  }
  
  if (dataUser !== null && usercart !== null && JSON.parse(localStorage.getItem('datacart')).length === 0) {
    return (
      <div>
        <NavHeader />
        <div className="list-cart__container">
          <div className="list-cart__wrapper">
            <EmptyCart className="list-cart__emptycart-image"/>
            <h1 className="list-cart__warning-text">Cart Anda Kosong</h1>
          </div>
        </div> 
      </div>
    )
  }
}

export default ListCart
