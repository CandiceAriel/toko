import React, {useState, createContext, useReducer} from 'react'
import { CartContext } from './CartContext';

export const BarangContext = createContext();

export const  BarangProvider = props => {
    const [barang,setBarang] = useState ([]);

    return (
        <BarangContext.Provider value={
          [barang,setBarang]
          }>
            {props.children}
        </BarangContext.Provider>
    );
};
