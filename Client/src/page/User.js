import React, { useState } from 'react';
import Axios from 'axios';
import '../style/SignUp.scss'

const User = () => {
    const [user,setList]=useState([]);

    const [nama,setNama] = useState('');
    const [noHP,setNoHP] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

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
        Axios.post("http://localhost:3001/createUser", {
          nama: nama,
          noHP: noHP,
          email: email,
          password: password,
        }).then(() => {
          setUser([
            ...user,
            {
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
        <form className="form" onClick={addBarang}>
            <h1>Sign Up</h1>
            <div>
                <label>Nama<input type="text"  className="inputNama" value={nama} onChange={updateNama}/></label>
            </div>
            <div>
                <label>No. Handphone<input type="text"  className="inputHP" value={noHP} onChange={updateHP}/></label>
            </div>
            <div>
                <label>Email<input type="number"  className="inputEmail" value={email} onChange={updateEmail}/></label>
            </div>
            <div>
                <label>Phone<input type="number"  className="inputPassword" value={password} onChange={updatePassword}/></label><br></br>
            </div>
            <div className="btn__submit">
                <input type="submit" value="Sign Up" className="btn" onClick={addBarang}/>
            </div>
        </form>
        </div>
    )
}

export default User
