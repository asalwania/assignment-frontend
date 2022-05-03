import React from "react";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
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
    <>
      <TableRow
        key={product._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="center">
          <img
            width={80}
            src={`http://localhost:8080/images/${product.imageUrl}`}
            alt="..."
          />
        </TableCell>
        <TableCell align="center">{product.name}</TableCell>
        <TableCell align="center">${product.price}</TableCell>
        <TableCell align="center">${product.quantity}</TableCell>
        <TableCell align="center">{product.description}</TableCell>
        <TableCell align="center">
          <Button onClick={() => setOpenEditForm(!openEditForm)}>
            {openEditForm ? "Cancel" : "Edit"}
          </Button>
          <Button onClick={onDeleteProduct}>Delete</Button>
        </TableCell>
      </TableRow>
      {openEditForm && (
        <UpdateProductForm
          close={() => setOpenEditForm(false)}
          product={product}
        />
      )}
    </>
  );
};

export default Product;
