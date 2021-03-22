import React, { useContext } from 'react'
import {CartContext} from './context/CartContext'
import NavHeader from './NavHeader';
import Cart from './Cart';


const ListCart = () => {
    const [cart,setCart]=useContext(CartContext);
 
    return (
        <div>
            <NavHeader />
            {cart.map(cart => (
                <Cart id={cart.id}
                        nama={cart.nama} 
                        harga={cart.harga}
                        stok={cart.stok}
                        counter={cart.count}/>
            ))}
        </div>
    )
}

export default ListCart
