import React from 'react'
import Axios from 'axios';
import './style/Cart.scss'

const Cart = ({id,nama, harga,qty}) => {

    return (
        <div className="container">
            <div>
                <table className="table">
                    <tbody>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{harga}</td>
                        <td>{qty}</td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart 
