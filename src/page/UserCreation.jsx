import React, { useState } from "react";
import UserCreationForm from "../component/UserCreationForm";
import { Alert, Box } from "@mui/material";
export default function UserCreation() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box component="h1">Thêm người dùng</Box>
      <Alert severity="warning" sx={{marginBottom: "20px"}} >Vui lòng chuyển khuôn mặt lần lượt theo hướng: Chính giữa, Trên, Dưới, Trái, Phải mỗi khi có thông báo trên màn hình</Alert>
      <Alert severity="warning" >Lưu ý: Không nhắm mắt, che miệng, che mũi trong quá trình thêm người dùng</Alert>
      <UserCreationForm />
    </Box>
  );
}
