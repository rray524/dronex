import React from "react";
import { Card } from "antd";
import drone from "../../imgs/1.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
    // destructure
    const { title, description, images, slug } = product;

    return (
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : drone}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1" alt="logo"
                />
            }
            actions={[
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-warning" />
                </Link>,
                <DeleteOutlined
                    onClick={() => handleRemove(slug)}
                    className="text-danger"
                />,
            ]}
        >
            <Meta
                title={title}
                description={`${description && description.substring(0, 40)}...`}
            />
        </Card>
    );
};

export default AdminProductCard;
