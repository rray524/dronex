import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { loggedInUser } from "./redux/slices/userSlice";
import ForgotPassword from "./pages/auth/ForgotPassword";
function App() {
  const dispatch = useDispatch();
  // check firebase auth state change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const idTokenResult = user.getIdTokenResult(/* forceRefresh */ false);
        console.log("user", user, idTokenResult);
        dispatch(loggedInUser({
          email: user.email,
          token: user.accessToken
        }))
      }
    });
  }, [])
  return (
    <Router>
      <Navigation />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Register />
        </Route>
        <Route exact path="/forgot/password">
          <ForgotPassword />
        </Route>
        <Route exact path="/registration/complete">
          <CompleteRegistration />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
