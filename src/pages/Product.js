import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useRouteMatch } from "react-router-dom";

const Product = () => {
    const [product, setProduct] = useState({});
    const match = useRouteMatch();

    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    const loadSingleProduct = () =>
        getProduct(slug).then((res) => setProduct(res.data));

    return (
        <div className="container">
            <div className="row pt-4">
                <SingleProduct product={product} />
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Product;
