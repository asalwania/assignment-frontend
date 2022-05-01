import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct, updateProduct } from "../../api/axios";
import UpdateProductForm from "./UpdateProductForm";

const Product = ({ product }) => {
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteMutation, isLoading: isDeleteing } = useMutation(
    deleteProduct,
    {
      onSuccess: () => queryClient.refetchQueries(["products"]),
      // must use ondeleteMutation function to avoid refetching but because i need more time
      // to do that i am simply refetching the data from server
    }
  );

  const { mutate: updateMutation, isLoading: isUpdating } = useMutation(
    updateProduct,
    {
      onSuccess: () => queryClient.refetchQueries(["products"]),
    }
  );

  const onDeleteProduct = () => {
    deleteMutation({ productId: product._id });
  };

  if (isDeleteing) return "Deleting..";

  return (
    <li>
      {/* <img src="" /> */}
      {openEditForm ? (
        <UpdateProductForm
          close={() => setOpenEditForm(false)}
          product={product}
        />
      ) : (
        <ul>
          <li>Name: {product.name}</li>
          <li>Price: {product.price}</li>
          <li>Quantity: {product.quantity}</li>
          <li>Description: {product.description}</li>
        </ul>
      )}
      <button onClick={() => setOpenEditForm(!openEditForm)}>
        {openEditForm ? "Cancel" : "Edit"}
      </button>
      <button onClick={onDeleteProduct}>Delete</button>
    </li>
  );
};

export default Product;
