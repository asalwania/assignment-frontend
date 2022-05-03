import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProdutsBySession } from "../../api/axios";

const SessionProducts = () => {
  const params = useParams();
  const sessionId = params.sessionId;

  const { data } = useQuery("sessionProduts", () =>
  getProdutsBySession({ sessionId })
  );
console.log(data?.data?.products)
  return <div>
      <TableContainer component={Paper}>
      <h1>Session Produts</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.products?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <img width={80} src={`http://localhost:8080/images/${row.imageUrl}`} alt="..."/>
              </TableCell>
              <TableCell align="center">
               {row.name}
              </TableCell>
              <TableCell align="center">
               ${row.price}
              </TableCell>
              <TableCell align="center">
               ${row.quantity}
              </TableCell>
              <TableCell align="center">
                  {row.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
};

export default SessionProducts;
