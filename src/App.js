import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Admin from "./components/admin";
import Login from "./components/Login";
import Register from "./components/admin/RegisterUser";
import RequiredAuth from "./components/RequiredAuth";
import User from "./components/user";
import useAuth from "./hooks/useAuth";

// Create a client
const queryClient = new QueryClient();

function App() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedToken = jwt_decode(user.token);
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        setAuth({ user: decodedToken.name, role: decodedToken.role });
        navigate(decodedToken.role, { replace: true });
      } else {
        setAuth({});
        navigate("/");
        localStorage.removeItem("user");
      }
    } else {
      setAuth({});
      navigate("/");
    }
  }, []);
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
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
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
