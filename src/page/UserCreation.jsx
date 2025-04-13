import React, { useState } from "react";
import UserCreationForm from "../component/UserCreationForm";
import { Box } from "@mui/material";
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
      <UserCreationForm />
    </Box>
  );
}
