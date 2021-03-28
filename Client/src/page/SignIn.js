import React, { useState } from 'react';
import Axios from 'axios';
import '../style/SignIn.scss'

const SignIn = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    //const [signInStatus, setSignInStatus] = useState('')

    //update Email value
    const updateEmail = e => {
        setEmail(e.target.value);
    }

    //Update Password value
    const updatePassword = e => {
        setPassword(e.target.value);
    }

    const signIn = () => {
        Axios.post("http://localhost:3001/SignIn",
        {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
    });
    }
 
    return (
        <div>
        <form className="form" onSubmit={signIn}>
            <h1>Sign In</h1>
            <div>
                <label>Email<input type="text" name="email" className="inputEmail" value={email} onChange={updateEmail}/></label>
            </div>
            <div>
                <label>Password<input type="text" name="password" className="inputPassword" value={password} onChange={updatePassword}/></label><br></br>
            </div>
            <div className="btn__submit">
                <input type="submit" value="Sign In" className="btn" onClick={signIn}/>
            </div>
        </form>
        <h1>Welcome {email}</h1>
        </div>
    )
}

export default SignIn
