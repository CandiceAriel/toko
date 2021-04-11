import React from 'react'
import { Link } from 'react-router-dom'
import './style/NavHeader.scss';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

export const NavHeader = () => {
    var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));

    const onDelete = () => {
        localStorage.removeItem('dataLogIn')
        localStorage.removeItem('datacart')
    }

    if(dataUser === null){
        return (
            <nav className="navbar">
                <div className="navbar__container">
                    <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                    <Link to="/Barang" className="link__barang">Barang</Link>
                    <Link to="/Cart" className="link__cart"><AiOutlineShoppingCart className="link__icon" size="25px"/></Link>
                    <Link to="/SignIn" className="link__signin">Sign In</Link>
                    <Link to="/SignUp" className="link__signup">Sign Up</Link>
                </div>
            </nav>
        )
    } else if (dataUser !== null){
        return (
            <nav className="navbar">
                <div className="navbar__container">
                    <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                    <Link to="/Barang" className="link__barang">Barang</Link>
                    <Link to="/Cart" className="link__cart"><AiOutlineShoppingCart className="link__icon"/></Link>
                    <Link to="/Profile" className="link__profile"><BsPerson className="link__icon"/></Link>
                    <Link to="/SignIn" className="link__signout" onClick={onDelete}>Sign Out</Link>
                </div>
            </nav>
        )
    }
}

export default NavHeader