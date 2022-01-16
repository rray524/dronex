import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import drone from "../../imgs/1.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    // destructure
    const { images, title, description, slug } = product;
    return (
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : drone}
                    style={{ height: "290px", objectFit: "cover" }}
                    className="p-1" alt="cover"
                />
            }
            actions={[
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-warning" /> <br /> View Product
                </Link>,
                <>
                    <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
                </>,
            ]}
        >
            <Meta
                title={title}
                description={`${description && description.substring(0, 40)}...`}
            />
        </Card>
    );
};

export default ProductCard;
