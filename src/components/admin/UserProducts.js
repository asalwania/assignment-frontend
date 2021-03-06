import React from "react";
import { useQuery } from "react-query";
import { getProdutsBySession } from "../../api/axios";

const UserProducts = ({ user,sessionId }) => {
  const { isLoading, data } = useQuery("sessionProducts", () =>
    getProdutsBySession({ sessionId })
  );
  console.log(data)
  if (isLoading) return "Loading...";
  return (
    <ol>
      <h3>Products of {user.name}</h3>
      {data?.data?.products.map((product) => (
        <div key={product._id}>
          <ul>
            <img
              src={`http://localhost:8080/images/${product.imageUrl}`}
              alt="..."
              width={100}
            />
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
