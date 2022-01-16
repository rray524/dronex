import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";
import { useRouteMatch } from "react-router-dom";

const CategoryHome = () => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const match = useRouteMatch();

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                            Loading...
                        </h4>
                    ) : (
                        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                            {products.length} Products in "{category.name}" category
                        </h4>
                    )}
                </div>
            </div>

            <div className="row">
                {products.map((p) => (
                    <div className="col" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
            <br /><br /><br /><br />
        </div>
    );
};

export default CategoryHome;
