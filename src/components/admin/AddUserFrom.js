import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../../api/axios";

const AddUserFrom = ({ close }) => {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(addUser, {
    onSuccess: () => queryClient.refetchQueries(["users"]),
  });

  const handleChange = (e) => {
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
    setUserData({
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    });
    close();
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="name"
        value={userData.name}
        placeholder="name"
      />
      <br />
      <br />
      <input
        onChange={handleChange}
        type="email"
        name="email"
        value={userData.email}
        placeholder="email"
      />
      <br />
      <br />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        value={userData.password}
        placeholder="password"
      />
      <br />
      <br />
      <input
        onChange={handleChange}
        name="address"
        value={userData.address}
        placeholder="address"
      />
      <br />
      <br />
      <input
        onChange={handleChange}
        name="phone"
        value={userData.phone}
        placeholder="phone"
      />
      <br />
      <br />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserFrom;
