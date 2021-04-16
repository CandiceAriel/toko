import React, { useState } from 'react';
import { Link, useHistory} from "react-router-dom";
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
        <div className="signup_container">
        <form className="signup_form" onSubmit={signUp}>
        <h5 className=" title">Sign Up</h5>
            <p className="subtitle">
                Sudah punya akun.
                <span><Link to="/SignIn" className="subtitle_link">Masuk disini</Link></span>
            </p>
            <div className="form_group">
                <label>User ID</label>
                <input type="text" name="email" placeholder="Masukkan user id" className="form_input input" value={userID} onChange={updateUserID}/>
            </div>
            <div className="form_group">
                <label>Nama</label>
                <input type="text" name="password" placeholder="Masukkan nama disini" className="form_input input" value={nama} onChange={updateNama}/>
            </div>
            <div className="form_group">
                <label>No HP</label>
                <input type="text" name="email" placeholder="0817895xxx" className="form_input input" value={noHP} onChange={updateHP}/>
            </div>
            <div className="form_group">
                <label>Email</label>
                <input type="text" name="email" placeholder="nama@example.com" className="form_input input" value={email} onChange={updateEmail}/>
            </div>
            <div className="form_group">
                <label>Password</label>
                <input type="password" name="email" placeholder="Minimal 6 karakter" className="form_input input" value={password} onChange={updatePassword}/>
            </div>
            <div className="form_button">
                <button type="submit" className="button" onClick={signUp}>SIGN UP</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default SignUp
