import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Quản lý điểm danh
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/users/new">
              Thêm người dùng
            </Button>
            <Button color="inherit" component={Link} to="/">
              Điểm danh
            </Button>
            <Button color="inherit" component={Link} to="/class">
              Lớp
            </Button>
            <Button color="inherit" component={Link} to="/attendance">
              Lịch sử điểm danh
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
