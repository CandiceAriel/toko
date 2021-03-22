import React from 'react'

const Cart = ({id,nama, harga}) => {

    return (
        <div className="container">
            <div>
                <table className="table">
                    <tbody>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{harga}</td>
                        
                        {/*<td><button onClick={addStok} className="button__tambah">+</button>{stokBaru}<button onClick={minusStok} className="button__kurang">-</button></td>
                        <td><button onClick={kurangiStok} className="button__tambahQty">Beli</button>{count}<button onClick={tambahStok} className="button__kurangQty">Jual</button></td>
    <td><button className="button__remove">Remove</button></td> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart
