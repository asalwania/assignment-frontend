import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { getUsers } from "../../api/axios";
import User from "./User";

const UsersList = () => {
  const { isLoading, error, data } = useQuery("users", getUsers);
  if (isLoading) return "Loading...";
  if (error) return "An error occured";
  return (
    <TableContainer component={Paper}> 
    <h3>Users List</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((row) => (
            <User user={row} key={row._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
