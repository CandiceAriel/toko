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
            <div className="container">
                <ul className="navbar__subnav">
                    <li><Link to="/Cart" className="link__cart"><FaShoppingCart className="link__icon"/></Link></li> 
                </ul>
            <nav className="navbar">
                    <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                    <ul className="navbar__item">
                        <li><Link to="/Barang" className="link__barang">Barang</Link></li>
                        <li><Link to="/SignIn" className="link__signin">Sign In</Link></li>
                    </ul>
                    
                    
            </nav>
            </div>
        )
    } else if (dataUser !== null){
        return (
            <div className="container">
                <ul className="navbar__subnav">
                    <li><Link to="/Cart" className="link__cart"><FaShoppingCart className="link__icon"/></Link></li> 
                </ul>
            <nav className="navbar">
                    <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                    <ul className="navbar__item">
                        <li><Link to="/Barang" className="link__barang">Barang</Link></li>
                        <li><Link to="/SignIn" className="link__signout" onClick={onDelete}>Sign Out</Link></li>
                    </ul>
            </nav>
            </div>
        )
    }
}

export default NavHeader