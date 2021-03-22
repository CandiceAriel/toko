import React, {useContext} from 'react'
import { Router,Link } from 'react-router-dom'
import { BarangContext } from './context/BarangContext';
import { CartContext } from './context/CartContext';
import './style/NavHeader.scss';


export const NavHeader = () => {
    const [barang,setBarang] = useContext(BarangContext);
    return (
        <header>
            <button>Add Barang</button>
            <p className="logo">TOKO SERBA ADA</p>
            <p className="logo">List of product: {barang.length} </p>
            {/*<Link to="/tambahBarang" className="button">Tambah Barang</Link> */}
        </header>
    )
}

export default NavHeader