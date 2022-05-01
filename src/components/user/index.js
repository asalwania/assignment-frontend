import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import AddProductForm from "./AddProcutFrom";
import Product from "./Product";


const User = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false);
  
  const { isLoading, data } = useQuery("products", getAllProducts);
  const userData = JSON.parse(localStorage.getItem("user"))
  
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({});
    navigate("/");
    localStorage.removeItem("user");
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      {/* create product,list products, edit,delete,with image */}
      <h1>{userData?.name}</h1> <button onClick={logout}>Logout</button>
      <div>
        <h1>Products</h1>
        <button onClick={() => setOpenAddProduct(!openAddProduct)}>
          {openAddProduct ? "Back to Products" : "Add Product"}
        </button>
        <br />
        <br />
        {openAddProduct ? (
          <AddProductForm close={() => setOpenAddProduct(false)} />
        ) : (
          <ol>
            {data?.data?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default User;
