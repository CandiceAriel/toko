import React from 'react'
import { Link } from 'react-router-dom'
import './style/NavHeader.scss';

export const NavHeader = () => {
    return (
        <div className="container-header">
            <div className="wrapper__button">
                <Link to="/Barang" className="link__barang">Barang</Link>
                <Link to="/AddBarang" className="link__tambahbarang">Tambah Barang</Link>
                <Link to="/Cart" className="link__cart">Cart</Link>
            </div>
            <p className="logo">TOKO SERBA ADA</p>
            <div className="wrapper__button">
                <Link to="/Profile" className="link__profile">Profile</Link>
                <Link to="/SignIn" className="link__signin">Sign In</Link>
                <Link to="/SignUp" className="link__signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default NavHeader