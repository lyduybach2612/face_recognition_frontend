import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createClass,
  deleteClass,
  getAllClasses,
} from "../service/ClassService";

export default function Class() {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [className, setClassName] = useState("");
  async function fetchData() {
    const response = await getAllClasses();
    setClasses(response);
    console.log(response);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleDelete = async (id) => {
    const updatedClasses = classes.filter((cls) => cls.id !== id);
    try {
      await deleteClass(id);
      const response = await fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createClass(className);
    await fetchData();
  };
  return (
    <Box>
      <TableContainer>
        <Box
          sx={{ marginTop: "2pc", marginBottom: "2pc", textAlign: "center" }}
          component="h1"
        >
          Danh Sách Lớp
        </Box>
        <Button variant="contained" color="info" onClick={handleOpen}>
          Thêm lớp học
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Thêm người dùng
            </Typography>

            <Box onSubmit={handleSubmit} component="form">
              <TextField
                id="outlined-basic"
                label="Tên lớp"
                variant="outlined"
                onChange={(e) => setClassName(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ height: "56px", marginLeft: "1pc" }}
                color="primary"
                type="submit"
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Modal>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Lớp</TableCell>
              <TableCell>Tên lớp</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.id}</TableCell>
                <TableCell>{cls.name}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ marginRight: "20px" }}>
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDelete(cls.id)}
                    color="error"
                    variant="contained"
                  >
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
