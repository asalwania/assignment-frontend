import React from "react";
import { useQuery } from "react-query";
import { getProdutsById } from "../../api/axios";

const UserProducts = ({ user }) => {
  const { isLoading, data } = useQuery("userProducts", () =>
    getProdutsById({ userId: user._id })
  );
  if (isLoading) return "Loading...";
  return (
    <ol>
      <h3>Products of {user.name}</h3>
      {data?.data?.map((product) => (
        <div key={product._id}>
          <ul>
            <li>
              <strong>Product Name: {product.name}</strong>
            </li>
            <li>Product Price: {product.price}</li>
            <li>Product Quantity: {product.quantity}</li>
            <li>Product Description: {product.description}</li>
            <li>Product Added On: {product.createdAt}</li>
            <li>Product Modified On: {product.updatedAt}</li>
          </ul>
          <br />
        </div>
      ))}
    </ol>
  );
};

export default UserProducts;
