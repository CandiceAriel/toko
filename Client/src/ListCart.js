import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style/ListCart.scss'
import Cart from './page/Cart';
import Axios from 'axios';

import { FaShoppingCart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import {ReactComponent as EmptyCart} from './image/emptycart.svg';


const ListCart = () => {
    const [cart,setCart]=useState([]);

    var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
    var usercart = JSON.parse(localStorage.getItem('usercart'));

    if(usercart !== null && JSON.parse(localStorage.getItem('usercart')).length !== 0){
      var totalorder = usercart[0].total;
    } else if (usercart === null){
      var totalorder = 0;
    }

    const onDelete = () => {
      localStorage.removeItem('dataLogIn')
      localStorage.removeItem('usercart')
  }
    
    //Get data upon accessing Cart menu
    useEffect(() => {
      var usercart = JSON.parse(localStorage.getItem('usercart'));

      setCart(usercart)

      if(localStorage.getItem('usercart') !== null && localStorage.getItem('usercart').length === 0){
        localStorage.removeItem('usercart')
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
        const usercart = JSON.parse(localStorage.getItem('usercart'));
        const filtered = usercart.filter(usercart => usercart.id !== id);
        localStorage.setItem('usercart', JSON.stringify(filtered));
    };
    
    if(dataUser !== null && usercart !== null && JSON.parse(localStorage.getItem('usercart')).length !== 0){
    return (
        <div>
          <nav className="list-cart__subnav">
              <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                <ul className="list-cart__subnav subnav__item">
                  <li><Link to="/SignIn" className="list-cart__subnav subnav__link__signout" onClick={onDelete}>Sign Out</Link></li> 
                </ul>
            </nav>
          <div className="list-cart__container">
            <div className="list-cart-item__container">
                {cart.map(cart => (
                  <div className="list-cart-item__wrapper" key={cart.id}>
                  <Cart userID={cart.userID}
                      cartID={cart.cartID}  
                      id={cart.id}
                      kodeBarang={cart.kodeBarang} 
                      namaBarang={cart.namaBarang} 
                      harga={cart.harga}
                      qty={cart.qty}
                      total={cart.total}/>
                      <button onClick={() => {deleteCart(cart.id);}}className="list-cart-item__button__delete"><FaTimes /> </button>
                  </div>
                ))}  
            </div> 
            <div className="list-cart-detil__container">
              <table className="list-cart-detil__table">
                <thead>
                  <tr>
                    <th className="list-cart-detil__table table__judul">Detail Order</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="list-cart-detil__table table__total"> TOTAL </td>
                    <td className="list-cart-detil__table table__jumlah">Rp. {totalorder}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    )} else if (dataUser === null) {
    return (
      <div>
        <nav className="list-cart__subnav">
              <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                <ul className="list-cart__subnav subnav__item">
                  <li><Link to="/SignIn" className="list-cart__subnav subnav__link__signin" onClick={onDelete}>Sign In</Link></li> 
                </ul>
            </nav>
        <div className="list-cart__container">
          <div className="list-cart__wrapper">
            <EmptyCart className="list-cart__emptycart-image"/>
            <h1 className="list-cart__warning-text">Cart Anda Kosong</h1>
            <Link to="/Barang" className="link__mainpage">KE HALAMAN UTAMA</Link>
          </div>
        </div> 
      </div>
    )
  } else if (usercart === null) {
    return (
      <div>
        <nav className="list-cart__subnav">
              <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                <ul className="list-cart__subnav subnav__item">
                  <li><Link to="/SignIn" className="list-cart__subnav subnav__link__signout" onClick={onDelete}>Sign Out</Link></li> 
                </ul>
            </nav>
        <div className="list-cart__container">
          <div className="list-cart__wrapper">
            <EmptyCart className="list-cart__emptycart-image"/>
            <h1 className="list-cart__warning-text">Cart Anda Kosong</h1>
            <Link to="/Barang" className="link__mainpage">KE HALAMAN UTAMA</Link>
          </div>
        </div> 
      </div>
    )
  }
  
  if (dataUser !== null && usercart !== null && JSON.parse(localStorage.getItem('usercart')).length === 0) {
    return (
      <div>
        <nav className="list-cart__subnav">
              <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                <ul className="list-cart__subnav subnav__item">
                <li><Link to="/SignIn" className="list-cart__subnav subnav__link__signout" onClick={onDelete}>Sign Out</Link></li> 
                </ul>
            </nav>
        <div className="list-cart__container">
          <div className="list-cart__wrapper">
            <EmptyCart className="list-cart__emptycart-image"/>
            <h1 className="list-cart__warning-text">Cart Anda Kosong</h1>
            <Link to="/Barang" className="link__mainpage">KE HALAMAN UTAMA</Link>
          </div>
        </div> 
      </div>
    )
  }
}

export default ListCart
