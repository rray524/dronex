import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../imgs/1.jpg";
import { showOrHide } from "../../redux/slices/drawerSlice";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const drawer = useSelector(state => state.drawer.showHide);
    console.log(cart);

    const imageStyle = {
        width: "100%",
        height: "50px",
        objectFit: "cover",
    };

    return (
        <Drawer
            className="text-center"
            title={`Cart / ${cart.length} Product`}
            placement="right"
            closable={false}
            onClose={() => {
                dispatch(showOrHide(false))
            }}
            visible={drawer}
        >

            {cart?.map(p => (
                <div key={p._id} className="row">
                    <div className="col">
                        {p.images[0] ? (
                            <>
                                <img src={p.images[0].url} style={imageStyle} alt="img" />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        ) : (
                            <>
                                <img src={laptop} style={imageStyle} alt="img" />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <button
                    onClick={() =>
                        dispatch(showOrHide(false))
                    }
                    className="text-center btn btn-primary btn-raised btn-block"
                >
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    );
};

export default SideDrawer;
