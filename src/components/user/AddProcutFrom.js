import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../../api/axios";

const theme = createTheme();

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
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add New User
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            ></Box>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={productData.name}
                placeholder="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                value={productData.price}
                placeholder="price"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                id="quantity"
                label="Quantity"
                name="quantity"
                autoComplete="quantity"
                value={productData.quantity}
                placeholder="quantity"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                id="description"
                label="Quantity"
                name="description"
                autoComplete="description"
                value={productData.description}
                placeholder="description"
                autoFocus
              />
              <input
                type="file"
                filename="productImg"
                onChange={handleImageChange}
              />
              <br />
              <br />
              <Button type="submit">Add Product</Button>
              <Button type="submit">Cancel</Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddProductForm;
