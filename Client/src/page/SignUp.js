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
        <form className="signup__form" onSubmit={signUp}>
            <div className="title-signup">
                <h5>Sign Up</h5>
            </div>
            <div>
                <label>ID<input type="text"  className="input__id" value={userID} onChange={updateUserID}/></label>
            </div>
            <div>
                <label>Nama<input type="text"  className="input__nama" value={nama} onChange={updateNama}/></label>
            </div>
            <div>
                <label>No. Handphone<input type="text"  className="input__hp" value={noHP} onChange={updateHP}/></label>
            </div>
            <div>
                <label>Email<input type="text"  className="input__email" value={email} onChange={updateEmail}/></label>
            </div>
            <div>
                <label>Password<input type="text"  className="input__password" value={password} onChange={updatePassword}/></label><br></br>
            </div>
            <div className="btn__submit">
                <input type="submit" value="Sign Up" className="btn" onClick={signUp}/>
            </div>
        </form>
        </div>
    )
}

export default SignUp
