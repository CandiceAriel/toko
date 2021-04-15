import React, { useState } from 'react';
import { Link, useHistory} from "react-router-dom";
import Axios from 'axios';
import '../style/SignIn.scss'
import '../style/NavHeader.scss';
import NavHeader from '../NavHeader';

const SignIn = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [signInStatus, setSignInStatus] = useState('')

    const history = useHistory();
    const navigateTo = () => history.push('/SignUp');
    const navigateToHome = () => history.push('/Barang');

    //update Email value
    const updateEmail = e => {
        setEmail(e.target.value);
    }

    //Update Password value
    const updatePassword = e => {
        setPassword(e.target.value);
    }

    const signIn = e => {
        e.preventDefault();
        Axios.post("http://localhost:3001/SignIn",
        {
            email: email,
            password: password
        }).then((response) => {
            if(response.data.message ){
                console.log(response.data.message)
                setSignInStatus(response.data.message)
            }else {
                localStorage.setItem('dataLogIn', JSON.stringify(response.data));
                var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
                delete dataUser[0].password;

                localStorage.setItem('dataLogIn', JSON.stringify(dataUser));

                if(dataUser !== null){
                    const userID = dataUser[0].userID;
            
                      Axios.post("http://localhost:3001/retrieveCart",
                      {
                        userID: userID
                      }).then((response) => {
                      if(response.data.message){
                        console.log(response.data.message)
                      }else {
                        localStorage.setItem('datacart', JSON.stringify(response.data));
                      }
                    });
                }
            }
            navigateToHome();
        });
    }
 
    return (
    <div>
        <NavHeader />
        <div className="container">
        <form className="signin__form" onSubmit={signIn}>
        <h5 className=" title">Sign In</h5>
            <p className="subtitle">
                Belum punya akun.
                <span><Link to="/SignUp" className="subtitle__link">Daftar disini</Link></span>
            </p>
            <div className="form__group">
                <label>Email</label>
                <input type="text" name="email" placeholder="nama@email.com" className="form__input input" value={email} onChange={updateEmail}/>
            </div>
            <div className="form__group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Minimal 6 karakter" className="form__input input" value={password} onChange={updatePassword}/>
            </div>
            <div className="form__button">
                <button type="submit" value="Sign In" className="form__button button" onClick={signIn}>Sign In</button>
            </div>
        </form>
        <h1>{signInStatus}</h1>
        </div>
    </div>
    )
}

export default SignIn
