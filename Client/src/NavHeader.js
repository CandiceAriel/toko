import React from 'react'
import { Link } from 'react-router-dom'
import './style/NavHeader.scss';

import { FaShoppingCart } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

export const NavHeader = () => {
    var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));

    const onDelete = () => {
        localStorage.removeItem('dataLogIn')
        localStorage.removeItem('datacart')
    }

    if(dataUser === null){
        return (
            <div className="navbar_container">
                <ul className="navbar_subnav">
                    <li><Link to="/Cart" className="link_cart"><FaShoppingCart className="link_icon"/></Link></li> 
                </ul>
            <nav className="navbar">
                    <Link to="/" className="link_home">TOKO SERBA ADA</Link>
                    <ul className="navbar_item">
                        <li><Link to="/Barang" className="link_barang">Barang</Link></li>
                        <li><Link to="/SignIn" className="link_signin">Sign In</Link></li>
                    </ul>
            </nav>
            </div>
        )
    } else if (dataUser !== null){
        return (
            <div className="navbar_container">
                <ul className="navbar_subnav">
                    <li><Link to="/SignIn" className="link_signout" onClick={onDelete}>Sign Out</Link></li> 
                    <li><Link to="/Cart" className="link_cart"><FaShoppingCart className="link_icon" size="20px"/></Link></li>
                </ul>
            <nav className="navbar">
                    <Link to="/" className="link_home">TOKO SERBA ADA</Link>
                    <ul className="navbar_item">
                        <li><Link to="/Barang" className="link_barang">Barang</Link></li>
                    </ul>
            </nav>
            </div>
        )
    }
}

export default NavHeader