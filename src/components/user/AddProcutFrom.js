import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../../api/axios";

const AddProductForm = ({ close }) => {
  const [productData, setProductData] = React.useState({
    name: "",
    price: 0,
    description: "",
    quantity: 1,
  });

  const [imageFile, setImageFile] = React.useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: () => queryClient.refetchQueries(["products"]),
  });

  const handleChange = (e) => {
    setProductData((pval) => {
      return {
        ...pval,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name) {
      alert("Product Name required");
    } else if (!productData.price) {
      alert("Product Price required");
    } else {
      const formData = new FormData();
      formData.append("productImg", imageFile);
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("quantity", productData.quantity);
      formData.append("description", productData.description);
      mutate(formData);
      // const file
      setImageFile({});
      setProductData({
        name: "",
        price: 0,
        description: "",
        quantity: 1,
      });
      close();
    }
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Name: </label>
        <br />
        <input
          onChange={handleChange}
          name="name"
          value={productData.name}
          placeholder="name"
        />
        <br />
        <label htmlFor="price">Price: </label>
        <br />
        <input
          onChange={handleChange}
          type="number"
          name="price"
          value={productData.price}
          placeholder="price"
        />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <br />
        <input
          onChange={handleChange}
          type="number"
          name="quantity"
          value={productData.quantity}
          placeholder="quantity (optional, Default 1)"
        />
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <input
          onChange={handleChange}
          name="description"
          value={productData.description}
          placeholder="description (optional)"
        />
        <br />
        <br />
        <input type="file" filename="productImg" onChange={handleImageChange} />
        <br />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
