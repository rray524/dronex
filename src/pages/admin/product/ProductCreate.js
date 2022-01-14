import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import AdminNav from "../../../components/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
    title: "HILLSTAR Foldable Drone with Dual Camera HD Wide Angle Lens ",
    description: "It weighs about as much as an apple and fits in the palm of your hand. Compact and convenient, this small drone is your ideal travel companion, transforming how you capture your favorite memories. Visual Hovering Dual Camera Drone with Dual Lights & Powerful motors.",
    price: "5999",
    categories: [],
    category: "",
    subs: [],
    shipping: "Yes",
    quantity: "50",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["RENIAL", "Amitasha", "HILLSTAR", "MANIYA", "ARCHSIGN"],
    color: "White",
    brand: "RENIAL",
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const user = useSelector(state => state.user.loggedInUser);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.tokenId)
            .then((res) => {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCatagoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB OPTIONS ON CATGORY CLICK", res);
            setSubOptions(res.data);
        });
        setShowSub(true);
    };

    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>Product create</h4>
                    )}
                    <hr />

                    {/* {JSON.stringify(values.images)} */}

                    <div className="py-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCatagoryChange={handleCatagoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
