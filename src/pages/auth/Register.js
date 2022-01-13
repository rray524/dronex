import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const history = useHistory();
    const user = useSelector(state => state.user.loggedInUser);
    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [user, history]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };


        sendSignInLinkToEmail(auth, email, config)
            .then(() => {
                // toast notification to check email for verification
                toast.success(
                    `Email is sent to ${email}. Click on the link to complete registration.`
                );
                // save user email in local storage
                window.localStorage.setItem('emailForSignIn', email);
                // clear state
                setEmail("");

            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);

            });
    }

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input type="email" style={{ borderBottom: '1px solid green', borderTop: '0', borderRight: 0, borderLeft: 0, borderRadius: 0 }} className='form-control' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} autoFocus /><br />
        <button type="submit" className="btn btn-raised mt-3" style={{ fontSize: '17px' }}>REGISTER</button>
    </form>

    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Register</h2>
                    <hr />
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;