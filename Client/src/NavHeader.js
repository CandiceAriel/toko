import React from 'react'
import { Link } from 'react-router-dom'
import './style/NavHeader.scss';


export const NavHeader = () => {
    return (
        <header>
            <div clasName="wrapper__button">
            <Link to="/Barang" className="link__barang">Barang</Link>
            <Link to="/AddBarang" className="link__tambahbarang">Tambah Barang</Link>
            <Link to="/Cart" className="link__cart">Cart</Link>
            </div>
            <p className="logo">TOKO SERBA ADA</p>
            <p>Cart</p>
            {/*<Link to="/tambahBarang" className="button">Tambah Barang</Link> */}
        </header>
    )
}

export default NavHeader