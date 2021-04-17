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
    var usercart = JSON.parse(localStorage.getItem('datacart'));

    if(usercart !== null && JSON.parse(localStorage.getItem('datacart')).length !== 0){
      var totalorder = usercart[0].total;
    } else if (usercart === null){
      var totalorder = 0;
    }

    const onDelete = () => {
      localStorage.removeItem('dataLogIn')
      localStorage.removeItem('datacart')
  }
    
    //Get data upon accessing Cart menu
    useEffect(() => {
      var usercart = JSON.parse(localStorage.getItem('datacart'));

      setCart(usercart)

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
          <nav className="list-cart_subnav">
              <Link to="/" className="link_home">TOKO SERBA ADA</Link>
                <ul className="list-cart_subnav subnav_item">
                  <li><Link to="/SignIn" className="list-cart_subnav subnav_link_signout" onClick={onDelete}>Sign Out</Link></li> 
                </ul>
            </nav>
          <div className="list-cart_container">
            <div className="list-cart-item_container">
                {cart.map(cart => (
                  <div className="list-cart-item_wrapper" key={cart.id}>
                  <Cart userID={cart.userID}
                      cartID={cart.cartID}  
                      id={cart.id}
                      kodeBarang={cart.kodeBarang} 
                      namaBarang={cart.namaBarang} 
                      harga={cart.harga}
                      qty={cart.qty}
                      total={cart.total}/>
                      <button onClick={() => {deleteCart(cart.id);}}className="list-cart-item_button_delete"><FaTimes /> </button>
                  </div>
                ))}  
            </div> 
            <div className="list-cart-detil_container">
              <table className="list-cart-detil_table">
                <thead>
                  <tr>
                    <th className="list-cart-detil_table table_judul">Detail Order</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="list-cart-detil_table table_total"> TOTAL </td>
                    <td className="list-cart-detil_table table_jumlah">Rp. {totalorder}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    )} else if (dataUser === null || usercart === null  ) {
    return (
      <div>
        <nav className="list-cart_subnav">
              <Link to="/" className="link_home">TOKO SERBA ADA</Link>
                <ul className="list-cart_subnav subnav_item">
                  <li><Link to="/SignIn" className="list-cart_subnav subnav_link_signin" onClick={onDelete}>Sign In</Link></li> 
                </ul>
            </nav>
        <div className="list-cart_container">
          <div className="list-cart_wrapper">
            <EmptyCart className="list-cart_emptycart-image"/>
            <h1 className="list-cart_warning-text">Cart Anda Kosong</h1>
            <Link to="/Barang" className="link_mainpage">KE HALAMAN UTAMA</Link>
          </div>
        </div> 
      </div>
    )
  }
  
  if (dataUser !== null && usercart !== null && JSON.parse(localStorage.getItem('datacart')).length === 0) {
    return (
      <div>
        <nav className="list-cart_subnav">
              <Link to="/" className="link_home">TOKO SERBA ADA</Link>
                <ul className="list-cart_subnav subnav_item">
                <li><Link to="/SignIn" className="list-cart_subnav subnav_link_signin" onClick={onDelete}>Sign In</Link></li> 
                </ul>
            </nav>
        <div className="list-cart_container">
          <div className="list-cart_wrapper">
            <EmptyCart className="list-cart_emptycart-image"/>
            <h1 className="list-cart_warning-text">Cart Anda Kosong</h1>
            <Link to="/Barang" className="link_mainpage">KE HALAMAN UTAMA</Link>
          </div>
        </div> 
      </div>
    )
  }
}

export default ListCart
