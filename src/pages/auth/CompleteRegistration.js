import React, { useEffect, useState } from 'react';
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../../redux/slices/userSlice';
import { createOrUpdateUser } from '../../functions/auth';



const CompleteRegistration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForSignIn'));
    }, [])

    // form 

    const completeRegisterForm = () => <form onSubmit={handleSubmit}>

        <input type="email" style={{ borderBottom: '1px solid green', borderTop: '0', borderRight: 0, borderLeft: 0, borderRadius: 0 }} className='form-control' value={email} disabled />
        <br /><br />
        <input type="password" style={{ borderBottom: '1px solid green', borderTop: '0', borderRight: 0, borderLeft: 0, borderRadius: 0 }} className='form-control' placeholder='Set Password' value={password} onChange={e => setPassword(e.target.value)} autoFocus />
        <br />
        <button type="submit" className="btn btn-raised mt-3" style={{ fontSize: '17px' }}>COMPLETE REGISTRATION</button>
    </form>

    const handleSubmit = (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }


        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                console.log(result);
                if (result.user.emailVerified) {
                    // remove user email fom local storage
                    window.localStorage.removeItem("emailForSignIn");
                    // get user 
                    const user = result.user;
                    // update state password
                    updatePassword(user, password).then(() => {
                        // Update successful.
                    }).catch((error) => {
                        // An error ocurred

                    });
                    // const idTokenResult = user.getIdTokenResult(/* forceRefresh */ false);
                    // redux store
                    // console.log("user", user, "idTokenResult", idTokenResult, password);
                    createOrUpdateUser(user.accessToken)
                        .then((res) => {
                            // console.log(res.data);
                            // redux token
                            dispatch(loggedInUser({
                                name: user.email.split("@")[0],
                                email: res.data.email,
                                role: res.data.role,
                                tokenId: user.accessToken,
                                _id: res.data._id
                            }))
                        })
                        .catch((err) => console.log(err));
                    // Logged in successfully message 
                    toast.success(
                        `You have been logged in successfully`
                    );
                    // redirect
                    history.push("/");
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });

    }
    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Complete Registration</h2>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    );
};

export default CompleteRegistration;