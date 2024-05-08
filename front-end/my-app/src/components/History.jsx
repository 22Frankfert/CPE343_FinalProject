import React from "react";
import ResponsiveAppBar from "./appBar"
import { Table } from "@mui/material";
import {TableContainer} from "@mui/material";
import {TableHead} from "@mui/material";
import {TableRow} from "@mui/material";
import {TableCell} from "@mui/material";
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import {TextField} from "@mui/material";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const columns = [
  { id: 'id', label: 'Case ID', minWidth: 170 },
  { id: 'status', label: 'สถานะ', minWidth: 100 },
  {
    id: 'date',
    label: 'วันที่อัปโหลด',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'result',
    label: 'ผลการแนะนำการรักษา',
    minWidth: 170,
    align: 'right',
    
  },
  
];

function createData(id, status, date, result) {
  return { id, status, date, result };
}

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof GetCaseHistoryResponse;
//   label: string;
//   numeric: boolean;
// }

// const headCells=[
//   {
//     id:"caseID",
//     numeric: false,
//     disablePadding: true,
//     label: "เคส",
//   },
//   {
//     id: "status",
//     numeric: false,
//     disablePadding: false,
//     label: "สถานะ",
//   },
//   {
//     id: "date",
//     numeric: false,
//     disablePadding: false,
//     label: "วันที่อัปโหลด",
//   },
// ];

const rows = [
  createData('0001', 'กำลังดำเนินการ', "22/03/2022", 'ดูข้อมูลเพิ่มเติม'),
  createData('0002', 'กำลังดำเนินการ', "22/03/2022", 'ดูข้อมูลเพิ่มเติม'),
  createData('0003', 'ดำเนินการเสร็จสิ้น', "22/03/2022", 'ดูข้อมูลเพิ่มเติม'),
];

const History = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <ResponsiveAppBar/>
      <h1 className="App-main">ประวัติ</h1>
      <div className="App-search" >
      <TextField id="outlined-search" label="Search ID" type="search"/>
      <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{bgcolor:'#F3C6C6'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );


  // return (
  //   <><div className="App">
  //     <ResponsiveAppBar></ResponsiveAppBar>
  //     <h1 className="App-main">ประวัติ</h1>
  //   </div><div>
  //       <TableContainer>
  //         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>รหัสเคส</TableCell>
  //               <TableCell align="right">สถานะ</TableCell>
  //               <TableCell align="right">วันที่อัปโหลด</TableCell>
  //               <TableCell align="right">ผลการวินิจฉัย</TableCell>
  //             </TableRow>
  //           </TableHead>
  //         </Table>
  //       </TableContainer>
  //     </div></>
  // );
}
export default History;