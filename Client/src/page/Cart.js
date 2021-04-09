import React from 'react'
import '../style/Cart.scss'

const Cart = ({id,kodeBarang,namaBarang, harga,qty,total}) => {

    return (
        <div >
                <table className="table">
                    <tbody>
                        <tr>
                            <td align="center">{kodeBarang}</td>
                            <td align="center">{namaBarang}</td>
                            <td align="center">{harga}</td>
                            <td align="center">{qty}</td>
                            <td align="center">{total}</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default Cart 
