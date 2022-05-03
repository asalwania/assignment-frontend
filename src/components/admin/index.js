import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import AddUserFrom from "./AddUserFrom";
import UsersList from "./UsersList";
const user = JSON.parse(localStorage.getItem("user"));

const email = user?.email;
const sessionId = user?.sessionId;

const Admin = () => {
  const [openAddUserFrom, setOpenAddUserFrom] = React.useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      setAuth({});
      navigate("/");
      localStorage.removeItem("user");
    },
  });
  const checkout = () => {
    mutate({ sessionId, email });
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin
            </Typography>
            <Button
              onClick={() => setOpenAddUserFrom(!openAddUserFrom)}
              color="inherit"
            >
              Add User
            </Button>
            <Button onClick={checkout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {openAddUserFrom ? (
        <AddUserFrom close={() => setOpenAddUserFrom(false)} />
      ) : (
        <UsersList />
      )}
    </div>
  );
};

export default Admin;
