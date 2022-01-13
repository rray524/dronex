import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../components/UserNav";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase";

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
        const user = auth.currentUser;
        updatePassword(user, password).then(() => {
            setLoading(false);
            setPassword("");
            toast.success("Password updated");
        }).catch((error) => {
            setLoading(false);
            toast.error(error.message);
        });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your Password</label><br /><br />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter new password"
                    disabled={loading}
                    value={password}
                /><br />
                <button
                    className="btn btn-primary"
                    disabled={!password || password.length < 6 || loading}
                >
                    Submit
                </button>
            </div>
        </form>
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <br /><br />
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Password Update</h4>
                    )}

                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default Password;
