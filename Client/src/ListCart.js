import React, { useState,useEffect } from 'react'
import './style/ListCart.scss'
import Cart from './page/Cart';
import Axios from 'axios';


const ListCart = () => {
    const [cart,setCart]=useState([]);

    //Get data upon accessing Cart menu
    useEffect(() => {
      Axios.get("http://localhost:3001/cart").then((response) => {
            setCart(response.data)
        });
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
    };
 
    return (
        <div>
            <span>
            </span>
            {cart.map(cart => (
                <div className="content" key={cart.id}>
                <Cart   id={cart.id}
                        nama={cart.nama} 
                        harga={cart.harga}
                        qty={cart.qty}
                        total={cart.total}/>
                        <button onClick={() => {deleteCart(cart.id);}}className="button__delete"> Remove </button>
                </div>
            ))}
        </div>
    )
}

export default ListCart
