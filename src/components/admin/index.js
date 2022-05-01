import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AddUserFrom from "./AddUserFrom";
import UsersList from "./UsersList";

const Admin = () => {
  const [openAddUserFrom, setOpenAddUserFrom] = React.useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({});
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <div>
      <h1>Admin</h1>
      <button onClick={logout}>Logout</button>
      <br />
      <br />
      <button onClick={() => setOpenAddUserFrom(!openAddUserFrom)}>
        {openAddUserFrom ? "Cancel" : "Add User"}
      </button>
      {openAddUserFrom ? (
        <AddUserFrom close={() => setOpenAddUserFrom(false)} />
      ) : (
        <UsersList />
      )}
    </div>
  );
};

export default Admin;
