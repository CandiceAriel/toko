import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import '../style/SignIn.scss'

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
                setSignInStatus(response.data.message)
            }else {
                localStorage.setItem('dataLogIn', JSON.stringify(response.data));
                var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
                delete dataUser[0].password;

                localStorage.setItem('dataLogIn', JSON.stringify(dataUser));
            }
            navigateToHome();
    });
    }
 
    return (
        <div>
        <form className="formSignIn" onSubmit={signIn}>
            <h1>Sign In</h1>
            <div>
                <label>Email<input type="text" name="email" className="signinEmail" value={email} onChange={updateEmail}/></label>
            </div>
            <div>
                <label>Password<input type="password" name="password" className="signinPassword" value={password} onChange={updatePassword}/></label><br></br>
            </div>
            <div className="wrapper-btn">
                <button onClick={navigateTo}  value="Sign Up" className="btn__SignUp">Sign Up</button>
                <button type="submit" value="Sign In" className="btn__SignIn" onClick={signIn}>Sign In</button>
            </div>
        </form>
        <h1>{signInStatus}</h1>
        </div>
    )
}

export default SignIn
