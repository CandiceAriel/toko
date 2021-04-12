import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../style/Cart.scss'

const Cart = ({id,kodeBarang,namaBarang, harga,qty,total}) => {
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

    return (
        <div>
            <table className="cart__table">
                    <tbody>
                        <tr align="center"><td>{kodeBarang}</td></tr>
                        <tr align="center"><td>{namaBarang}</td></tr>
                        <tr align="center"><td>{harga}</td></tr>
                        <tr align="center"><td><button onClick={tambahJum} className="button__tambah">+</button>{qtyBaru}<button onClick={kurangiJum} className="button__kurang">-</button></td></tr>
                        <tr align="center"><td>{total}</td></tr>
                    </tbody>
            </table>
        </div>
    )
}

export default Cart 
