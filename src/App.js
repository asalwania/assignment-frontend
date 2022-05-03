import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Admin from "./components/admin";
import Login from "./components/Login";
import Register from "./components/admin/RegisterUser";
import RequiredAuth from "./components/RequiredAuth";
import User from "./components/user";
import useAuth from "./hooks/useAuth";
import { logout } from "./api/axios";
import { useMutation } from "react-query";
import UserActivities from "./components/admin/UserActivities";
import SessionProducts from "./components/admin/SessionProducts";

const user = JSON.parse(localStorage.getItem("user"));

const email = user?.email;
const sessionId = user?.sessionId;

function App() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      setAuth({});
      navigate("/");
      localStorage.removeItem("user");
    },
  });

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedToken = jwt_decode(user.token);
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        setAuth({ user: decodedToken.name, role: decodedToken.role });
        navigate(decodedToken.role, { replace: true });
      } else {
        mutate({ sessionId, email });
      }
    } else {
      mutate({ sessionId, email });
    }
  }, []);
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes for user */}
      <Route element={<RequiredAuth allowedRoles={["user"]} />}>
        <Route path="/user" element={<User />} />
      </Route>
      {/* protected routes for admin */}
      <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="admin/:userId" element={<UserActivities />} />
        <Route path="admin/:sessionId/products" element={<SessionProducts />} />
      </Route>
    </Routes>
  );
}

export default App;
