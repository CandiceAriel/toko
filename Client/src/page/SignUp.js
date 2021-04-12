import React, { useState } from 'react';
import Axios from 'axios';
import '../style/SignUp.scss'

import NavHeader from '../NavHeader';

const SignUp = () => {
    const [user,setUser]=useState([]);

    const [userID,setUserID] = useState('');
    const [nama,setNama] = useState('');
    const [noHP,setNoHP] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    //update Nama value
    const updateUserID = e => {
        setUserID(e.target.value);
    }
    
    //update Nama value
    const updateNama = e => {
        setNama(e.target.value);
    }
    
    //update Email value
    const updateEmail = e => {
        setEmail(e.target.value);
    }

    //Update HP value
    const updateHP = e => {
        setNoHP(e.target.value);
    }

    //Update Password value
    const updatePassword = e => {
        setPassword(e.target.value);
    }

    //Sign Up
    const signUp = () => {
        Axios.post("http://localhost:3001/register", {
          userID: userID,
          nama: nama,
          noHP: noHP,
          email: email,
          password: password,
        }).then(() => {
          setUser([
            ...user,
            {
                userID: userID,
                nama: nama,
                noHP: noHP,
                email: email,
                password: password,
            },
          ]);
        });
      };
 
    return (
        <div>
        <NavHeader />
        <div className="signup__container">
        <form className="signup__form">
            <div className="signup__form__title">
                <h5 className="signup__form__title__text">Sign Up</h5>
            </div>
            <div className="signup__form__input">
                <div className="signup__form__input__group">
                    <label>ID</label>
                    <input type="text"  className="signup__form__input__id" value={userID} onChange={updateUserID}/>
                </div>
                <div className="signup__form__input__group">
                    <label>Nama</label>
                    <input type="text"  className="signup__form__input__nama" value={nama} onChange={updateNama}/>
                </div>
                <div className="signup__form__input__group">
                    <label>No. Handphone</label>
                    <input type="text"  className="signup__form__input__hp" value={noHP} onChange={updateHP}/>
                </div>
                <div className="signup__form__input__group">
                    <label>Email</label>
                    <input type="text"  className="signup__form__input__email" value={email} onChange={updateEmail}/>
                </div>
                <div className="signup__form__input__group">
                    <label>Password</label>
                    <input type="text"  className="signup__form__input__password" value={password} onChange={updatePassword}/>
                </div>
            </div>
            <div className="signup__form__btn">
                <input type="submit" value="Sign Up" className="signup__form__btn__signup" onClick={signUp}/>
            </div>
        </form>
        </div>
        </div>
    )
}

export default SignUp
