import React from 'react'
import '../style/Cart.scss'

const Cart = ({id,nama, harga,qty,total}) => {

    return (
        <div className="container__cart">
            <div>
                <table className="table">
                    <tbody>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{harga}</td>
                        <td>{qty}</td>
                        <td>{total}</td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart 
