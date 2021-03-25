import React,{ useState } from 'react'

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
