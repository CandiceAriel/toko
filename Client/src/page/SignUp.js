import React, { useState } from 'react';
import Axios from 'axios';
import '../style/SignUp.scss'

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
        <form className="formSignUp" onSubmit={signUp}>
            <h1>Sign Up</h1>
            <div>
                <label>ID<input type="text"  className="inputID" value={userID} onChange={updateUserID}/></label>
            </div>
            <div>
                <label>Nama<input type="text"  className="inputNama" value={nama} onChange={updateNama}/></label>
            </div>
            <div>
                <label>No. Handphone<input type="text"  className="inputHP" value={noHP} onChange={updateHP}/></label>
            </div>
            <div>
                <label>Email<input type="text"  className="inputEmail" value={email} onChange={updateEmail}/></label>
            </div>
            <div>
                <label>Password<input type="text"  className="inputPassword" value={password} onChange={updatePassword}/></label><br></br>
            </div>
            <div className="btn__submit">
                <input type="submit" value="Sign Up" className="btn" onClick={signUp}/>
            </div>
        </form>
        </div>
    )
}

export default SignUp
