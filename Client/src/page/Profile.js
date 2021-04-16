import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/Profile.scss'

import NavHeader from '../NavHeader';

const Profile = () => {
    const [nama,setNama] =useState('');
    const [noHP,setNoHP] =useState('');
    const [email,setEmail] =useState('');

    //Get data upon accessing localhost
    useEffect(() => {
        var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));

        if(dataUser === null){
            setNama('Please sign in first')
            setNoHP('No data')
            setEmail('No data')
        } else if(dataUser !== null){
            setNama(dataUser[0].nama)
            setNoHP(dataUser[0].noHP)
            setEmail(dataUser[0].email)
        } 
      }, [])
    
      const onDelete = () => {
        localStorage.removeItem('dataLogIn')
      }

    return (
        <div>
            <NavHeader />
        <div className="container_profile">
            <div className="wrapper_profile">
                <h3>{nama}</h3>
                <p>{noHP}</p>
                <p>{email}</p>
            </div>
            <div className="wrapper_link">
                <Link to="/SignIn" className="link_SignOut" onClick={onDelete}>Sign Out</Link>
            </div>
        </div>
        </div>
    )
}

export default Profile
