import React, {useState, createContext} from 'react'

export const CartContext = createContext();

export const  CartProvider = props => {

    const [cart,setCart] = useState ([
        { 
          id: 1001,
          nama: 'Tepung Kanji',
          harga: 50000,
          stok: 10,
          count: 0,
          tglMasuk: '10/01/2021',
          tglKeluar: '15/01/2021',
        },
    ]);

    return (
        <CartContext.Provider value={[cart,setCart]}>
            {props.children}
        </CartContext.Provider>
    );
};
