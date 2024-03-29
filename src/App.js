import React, { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
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
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";
import PasswordChange from "./pages/admin/PasswordChange";

function App() {
  const dispatch = useDispatch();
  // check firebase auth state change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const idTokenResult = user.getIdTokenResult(/* forceRefresh */ false);
        // console.log("user", user, idTokenResult);
        currentUser(user.accessToken)
          .then((res) => {
            // console.log(res.data);
            // redux token
            dispatch(loggedInUser({
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              tokenId: user.accessToken,
              _id: res.data._id
            }))
          })
          .catch((err) => console.log(err));
      }
    });
  }, [dispatch])
  return (
    <Router>
      <Navigation />
      <SideDrawer />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
      />
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
        <Route exact path="/user/history">
          <History />
        </Route>
        <Route exact path="/user/password">
          <Password />
        </Route>
        <Route exact path="/user/wishlist">
          <Wishlist />
        </Route>
        <Route exact path="/admin/dashboard">
          <AdminDashboard />
        </Route>
        <Route exact path="/admin/category">
          <CategoryCreate />
        </Route>
        <Route exact path="/admin/category/:slug">
          <CategoryUpdate />
        </Route>
        <Route exact path="/admin/sub">
          <SubCreate />
        </Route>
        <Route exact path="/admin/sub/:slug">
          <SubUpdate />
        </Route>
        <Route exact path="/admin/product">
          <ProductCreate />
        </Route>
        <Route exact path="/admin/products">
          <AllProducts />
        </Route>
        <Route exact path="/admin/product/:slug">
          <ProductUpdate />
        </Route>
        <Route exact path="/admin/coupon">
          <CreateCouponPage />
        </Route>
        <Route exact path="/admin/password">
          <PasswordChange />
        </Route>
        <Route exact path="/product/:slug">
          <Product />
        </Route>
        <Route exact path="/category/:slug">
          <CategoryHome />
        </Route>
        <Route exact path="/sub/:slug">
          <SubHome />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/payment">
          <Payment />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
