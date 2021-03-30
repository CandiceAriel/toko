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
                var dataNama = JSON.parse(localStorage.getItem('dataLogIn'));
                setSignInStatus('Welcome' + dataNama[0].nama)
            }
            console.log(response.data);
    });
    }
 
    return (
        <div>
        <form className="formSignIn" onSubmit={signIn}>
            <h1>Sign In</h1>
            <div>
                <label>Email<input type="text" name="email" className="inputEmail" value={email} onChange={updateEmail}/></label>
            </div>
            <div>
                <label>Password<input type="password" name="password" className="inputPassword" value={password} onChange={updatePassword}/></label><br></br>
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
