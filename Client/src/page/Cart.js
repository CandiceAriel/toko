import React from 'react'
import '../style/Cart.scss'

const Cart = ({id,kodeBarang,namaBarang, harga,qty,total}) => {

    return (
        <div className="content">
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>{kodeBarang}</td>
                            <td>{namaBarang}</td>
                            <td>{harga}</td>
                            <td>{qty}</td>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart 
