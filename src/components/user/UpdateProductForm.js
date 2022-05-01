import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateProduct } from "../../api/axios";

const UpdateProductForm = ({ close, product }) => {
  const [productData, setProductData] = React.useState({
    name: "",
    price: 0,
    description: "",
    quantity: 1,
    productId:""
  });

  React.useEffect(() => {
    setProductData({
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      productId:product._id
    });
  }, [product]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateProduct, {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name) {
      alert("Product Name required");
    } else if (!productData.price) {
      alert("Product Price required");
    } else {
      // const formData = new FormData();
      // formData.append("file", imageFile);
      // formData.append("productData", productData);
      mutate(productData);
      // const file
      // setImageFile({});
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
      <form onSubmit={handleSubmit}>
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
        {/* <input type="file" name="image" onChange={handleImageChange} /> */}
        {/* <br />
        <br /> */}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
