import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import '../style/Cart.scss'

const Cart = ({id,cartID,kodeBarang,namaBarang, harga,qty,total}) => {
    const [qtyBaru,setQtyBaru] = useState(qty);
    const [cart, setCart] =  useState([])

    //Kurangi stok based on qty for counter button
    const kurangiJum = e => {
        e.preventDefault();
        setQtyBaru(qtyBaru-1)

        Axios.put("http://localhost:3001/updateCart", { qty: qtyBaru-1 , total: harga*qtyBaru, kodeBarang: kodeBarang }).then(
          (response) => {
            setCart(cart.map((cart) => {
                return cart.id === id ? {kodeBarang: kodeBarang,nama: namaBarang, harga: harga, qty: qtyBaru-1, total: harga*qtyBaru } : cart
            }))
          }
        );
     }
 
     //Tambah stok based on qty for counter button
     const tambahJum = () => {
         setQtyBaru(qtyBaru+1)
         updateCart(kodeBarang);
    }

    //Update Barang to DB based on new value
    const updateCart = (kodeBarang) => {
        Axios.put("http://localhost:3001/updateCart", { qty: qtyBaru+1 , total: harga*qtyBaru, kodeBarang: kodeBarang }).then(
          (response) => {
            setCart(cart.map((cart) => {
                return cart.id === id ? {kodeBarang: kodeBarang,nama: namaBarang, harga: harga, qty: qtyBaru+1, total: harga*qtyBaru } : cart
            }))
          }
        );
    };

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

    return (
        <div>
          <table className="cart__table">
              <tbody>
                <tr align="center" className="cart__table table__rowproduct"><td>{kodeBarang}</td><td>{namaBarang}</td><td>{qtyBaru}</td></tr>
                <tr align="center" className="cart__table table__rowprice"><td>RP. {total}</td><td>Rp. ({harga} / PCS)</td></tr>
              </tbody>
          </table>
        </div>
    )
}

export default Cart 
