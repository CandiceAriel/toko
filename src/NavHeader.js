import React, {useContext} from 'react'
import { BarangContext } from './BarangContext';
import './style/NavHeader.scss';


export const NavHeader = () => {
    const [barang,setBarang] = useContext(BarangContext);
    return (
        <header>
            <p></p>
            <p className="logo">TOKO SERBA ADA</p>
            <p className="logo">List of product: {barang.length} </p>
            {/*<Link to="/tambahBarang" className="button">Tambah Barang</Link> */}
        </header>
    )
}

export default NavHeader