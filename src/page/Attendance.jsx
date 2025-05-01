import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { exportExcel, getAllAttendences } from "../service/AttendanceService";

export default function Attendance() {
  const [attendences, setAttendences] = useState([]);
  const fetchData = async () => {
    const response = await getAllAttendences();
    setAttendences(response);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const time = (timestamp) => {
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formatted = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    return formatted;
  };
  const onExport = async () => {
    const blob = await exportExcel(attendences);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.xlsx";
    document.body.appendChild(a);
    a.click();

    
    a.remove();
    window.URL.revokeObjectURL(url);
  };
  return (
    <Box>
      <TableContainer>
        <Box
          component="h1"
          sx={{ marginTop: "2pc", marginBottom: "2pc", textAlign: "center" }}
        >
          Lịch sử điểm danh
        </Box>
        <Button variant="contained" color="info" onClick={onExport}>
          Xuất file excel
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Sinh Viên</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Thời gian điểm danh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendences.map((attendence) => (
              <TableRow key={attendence.id}>
                <TableCell>{attendence.user.name}</TableCell>
                <TableCell>{attendence.credit_class.name}</TableCell>
                <TableCell>{time(attendence.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
