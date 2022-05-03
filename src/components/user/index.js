import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import AddProductForm from "./AddProcutFrom";
import Product from "./Product";
import { logout } from "../../api/axios";

const user = JSON.parse(localStorage.getItem("user"));

const email = user?.email;
const sessionId = user?.sessionId;

const User = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false);

  const { isLoading, data } = useQuery("products", getAllProducts);
  const userData = JSON.parse(localStorage.getItem("user"));
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      setAuth({});
      navigate("/");
      localStorage.removeItem("user");
    },
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const checkout = () => {
    mutate({ sessionId, email });
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userData?.name}
            </Typography>
            <Button
              onClick={() => setOpenAddProduct(!openAddProduct)}
              color="inherit"
            >
              Add Product
            </Button>
            <Button onClick={checkout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {openAddProduct ? (
        <AddProductForm close={() => setOpenAddProduct(false)} />
      ) : (
        // <ol>
        //   {data?.data?.map((product) => (
        //     <Product key={product._id} product={product} />
        //   ))}
        // </ol>
        <>
          <TableContainer component={Paper}>
            <h3> Products</h3>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default User;
