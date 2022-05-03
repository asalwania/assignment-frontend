import React from "react";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <TableRow
      key={user._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center" component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell
        style={{ color: user.isActive ? "Green" : "red" }}
        align="center"
      >
        {user.isActive ? "Online" : "Ofline"}
      </TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">{user.phone}</TableCell>
      <TableCell align="center">{user.address}</TableCell>
      <TableCell align="center">{user.createdAt}</TableCell>
      <TableCell align="center">
        <Button
          onClick={() => {
            navigate(`${user._id}`);
          }}
        >
          Acivities
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default User;
