import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/axios";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const onSuccess = ({ data }) => {
    localStorage.setItem("user", JSON.stringify(data));
    setAuth({ user: data.name, role: data.role });
    setUserData({
      email: "",
      password: "",
    });
    navigate(data.role, { replace: true });
  };

  const { mutate, isLoading } = useMutation(login, {
    onSuccess,
  });

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUserData((pval) => {
      return {
        ...pval,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(userData);
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={userData.email}
          onChange={handleOnChange}
          placeholder="email"
        />
        <br />
        <br />
        <input
          name="password"
          value={userData.password}
          onChange={handleOnChange}
          placeholder="password"
          type="password"
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
