import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const user = useSelector(state => state.user.loggedInUser);
    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [user, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // for redirect user to login page
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        sendPasswordResetEmail(auth, email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);

            });
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading</h4>
                    ) : (
                        <h4>Reset password using your email</h4>
                    )}

                    <form onSubmit={handleSubmit}>
                        <br /><br />
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type your email"
                            autoFocus
                            style={{ borderBottom: '1px solid green', borderTop: '0', borderRight: 0, borderLeft: 0, borderRadius: 0 }}
                        />
                        <br /><br />
                        <button className="btn btn-raised" disabled={!email}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;
