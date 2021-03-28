import React, { useState } from 'react'
import './style/ListCart.scss'
import Cart from './page/Cart';
import Axios from 'axios';


const ListCart = () => {
    const [cart,setCart]=useState([]);

    //Show Cart data from DB
    const getCart = () => {
        Axios.get("http://localhost:3001/cart").then((response) => {
            setCart(response.data)
        });
    };

    //Delete Cart data based on ID
    const deleteCart = (id) => {
        alert(id);
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
                <button onClick={getCart} className="button__show">Show Items</button>
            </span>
            {cart.map(cart => (
                <div className="content">
                <Cart id={cart.id}
                        nama={cart.nama} 
                        harga={cart.harga}
                        qty={cart.qty}/>
                        <button onClick={() => {deleteCart(cart.id);}}className="button__delete"> Remove </button>
                </div>
            ))}
        </div>
    )
}

export default ListCart
