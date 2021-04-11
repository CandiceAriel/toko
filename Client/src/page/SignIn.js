import React, { useState } from 'react';
import { useHistory} from "react-router-dom";
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
                      if(response.data.message ){
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
        <form className="signin__form" onSubmit={signIn}>
            <div className="title-signin">
                <h5>Sign In</h5>
            </div>
            <div>
                <input type="text" name="email" placeholder="Email" className="input__email" value={email} onChange={updateEmail}/>
            </div>
            <div>
                <input type="password" name="password" placeholder="Password" className="input__password" value={password} onChange={updatePassword}/>
            </div>
            <div className="wrapper-btn">
                <button onClick={navigateTo}  value="Sign Up" className="btn__signup">Sign Up</button>
                <button type="submit" value="Sign In" className="btn__signin" onClick={signIn}>Sign In</button>
            </div>
        </form>
        <h1>{signInStatus}</h1>
        </div>
    )
}

export default SignIn
