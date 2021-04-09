import React from 'react'
import { Link } from 'react-router-dom'
import './style/NavHeader.scss';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

export const NavHeader = () => {
    var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));

    const onDelete = () => {
        localStorage.removeItem('dataLogIn')
    }

    if(dataUser === null){
        return (
            <div className="nav-header__container-header">
                    <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                <div className="nav-header__wrapper__link">
                    <Link to="/Barang" className="link__barang">Barang</Link>
                    <Link to="/Cart" className="link__cart"><AiOutlineShoppingCart className="link__cart__icon"/></Link>
                    <Link to="/SignIn" className="link__signin">Sign In</Link>
                    <Link to="/SignUp" className="link__signup">Sign Up</Link>
                </div>
            </div>
        )
    } else if (dataUser !== null){
        return (
            <div className="nav-header__container-header">
                <div className="wrapper__link">
                    <Link to="/" className="link__home">TOKO SERBA ADA</Link>
                    <Link to="/Barang" className="link__barang">Barang</Link>
                    <Link to="/Cart" className="link__cart"><AiOutlineShoppingCart className="link__cart__icon"/></Link>
                    <Link to="/Profile" className="link__profile"><BsPerson className="link__profile__icon"/></Link>
                    <Link to="/SignIn" className="link__signout" onClick={onDelete}>Sign Out</Link>
                </div>
            </div>
        )
    }
}

export default NavHeader