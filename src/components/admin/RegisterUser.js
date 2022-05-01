import React from "react";

const Register = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="name"
        />
        <br />
        <br />
        <input
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="email"
          type="email"
        />
        <br />
        <br />
        <input
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="password"
          type="password"
        />
        <br />
        <br />
        <input
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="phone"
        />
        <br />
        <br />
        <input
          name="address"
          value={userData.address}
          onChange={handleChange}
          placeholder="address"
        />
        <br />
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default Register;
