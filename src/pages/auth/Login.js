import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { loggedInUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.user.loggedInUser);
    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);
                // req token to headers 
                createOrUpdateUser(user.accessToken)
                    .then((res) => console.log("CREATE OR UPDATE RES", res))
                    .catch();
                // redux token
                dispatch(loggedInUser({
                    email: user.email,
                    tokenId: user.accessToken
                }))
                // notification success
                toast.success(
                    `You have been logged in successfully`
                );
                // redirect to homepage
                history.push("/")
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    };

    // google login 

    const googleLogin = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                dispatch(loggedInUser({
                    email: user.email,
                    tokenId: token
                }))
                toast.success(
                    `You have been logged in successfully`
                );
                history.push("/")
                // ...
            }).catch((error) => {
                // Handle Errors here.
                toast.error(error.code);
            });
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <br />
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                    style={{ borderBottom: '1px solid green', borderTop: '0', borderRight: 0, borderLeft: 0, borderRadius: 0 }}
                />
            </div>

            <div className="form-group">
                <br />
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    style={{ borderBottom: '1px solid green', borderTop: '0', borderRight: 0, borderLeft: 0, borderRadius: 0 }}
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                Login with Email/Password
            </Button>

        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        Login with Google
                    </Button><br />
                    <Link to="/forgot/password" style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '15px' }} className="text-danger">
                        Forgot Password ?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
