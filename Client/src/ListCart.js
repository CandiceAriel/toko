import React, { useState,useEffect } from 'react'
import './style/ListCart.scss'
import Cart from './page/Cart';
import NavHeader from './NavHeader';
import Axios from 'axios';


const ListCart = () => {
    const [cart,setCart]=useState([]);
    const [userStatus,setUserStatus] = useState('')
    
    //Get data upon accessing Cart menu
    useEffect(() => {
      var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
      
        if(dataUser === null){
            setUserStatus('Your cart is empty')
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
         }
      });
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
    };
 
    return (
        <div>
          <NavHeader />
            <div className="container">
              <div className="list-cart__wrapper">
                <table className="list-cart__table">
                <thead>
                 <tr>
                    <th align="center" width="125px">Kode Barang</th>
                    <th align="center" width="125px">Nama Barang</th>
                    <th align="center" width="125px">Harga</th>
                    <th align="center" width="125px">Jumlah</th>
                    <th align="center" width="125px">Total</th>
                    <th align="center" width="40px"></th>
                 </tr>
                </thead>
                <tbody>
                {cart.map(cart => (
                  <tr>
                  <div className="wrapper" key={cart.id}>
                  <Cart userID={cart.userID}  
                      id={cart.id}
                      kodeBarang={cart.kodeBarang} 
                      namaBarang={cart.namaBarang} 
                      harga={cart.harga}
                      qty={cart.qty}
                      total={cart.total}/>
                      <button onClick={() => {deleteCart(cart.id);}}className="button__delete"> Remove </button>
                  </div>
                  </tr>
                ))}
                </tbody>
                </table>
            </div>
          </div> 
      </div>
    )
}

export default ListCart
