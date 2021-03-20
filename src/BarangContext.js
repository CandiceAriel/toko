import React, {useState, createContext} from 'react'

export const BarangContext = createContext();

export const  BarangProvider = props => {
    const [barang,setBarang] = useState ([
        { 
          id: 1001,
          nama: 'Tepung Kanji',
          harga: 50000,
          stok: 3,
          count: 0,
          tglMasuk: '10/01/2021',
          tglKeluar: '15/01/2021',
        },
        { 
          id: 1001,
          nama: 'Tepung Kanji',
          harga: 50000,
          stok: 3,
          count: 0,
          tglMasuk: '10/01/2021',
          tglKeluar: '15/01/2021',
        },
    ]);

    return (
        <BarangContext.Provider value={[barang,setBarang]}>
            {props.children}
        </BarangContext.Provider>
    );
};
