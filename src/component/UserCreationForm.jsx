import React, { useState, useRef } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import Webcam from "react-webcam";
import { createFacenetEmbedding } from "../service/FacenetService";
import { createUser } from "../service/UserService";
import { uploadImage } from "../service/ImageService";
import { createArcfaceEmbedding } from "../service/ArcFaceService";

export default function UserCreationForm() {
  const imageStates = ["Chính giữa", "Trên", "Dưới", "Trái", "Phải"];
  const [instruction, setInstruction] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const webcamRef = useRef(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const upload = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setMessage("Không thể chụp ảnh từ webcam");
        return -1;
      }
      const response = await uploadImage(imageSrc);
      if (response.detail.code == 200) {
        const id = response.detail.data.image_id;
        return id;
      }
      setMessage("Ảnh chưa được upload");
      return -1;
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Lỗi khi upload ảnh");
      return -1;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const userResponse = await createUser(username);
      console.log(userResponse);
      if (userResponse) {
        const user_id = userResponse;
        for (let i = 0; i < imageStates.length; i++) {
          setInstruction(imageStates[i]);
          await delay(2000);
          const image_id = await upload();
          if (image_id === -1) {
            setError(`Lỗi khi chụp ảnh lần ${i + 1}`);
            return;
          }

          const facenetResponse = await createFacenetEmbedding(
            image_id,
            user_id
          );
          if (facenetResponse.detail.code != 200) {
            setError(`Lỗi khi tạo Facenet embedding cho ảnh ${i + 1}`);
            return;
          }

          // const arcfaceResponse = await createArcfaceEmbedding(
          //   image_id,
          //   user_id
          // );
          // if (arcfaceResponse.detail.code != 200) {
          //   setError(`Lỗi khi tạo Arcface embedding cho ảnh ${i + 1}`);
          //   return;
          // }

          setMessage(`Đã thêm ảnh ${i + 1}/5`);
        }
        setMessage("Tạo người dùng thành công!");
      } else {
        setError("Lỗi khi tạo người dùng");
      }
    } catch (error) {
      console.log("Submit error:", error);
      setError("Có lỗi xảy ra khi xử lý");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Webcam
        ref={webcamRef}
        style={{ marginBottom: "20px" }}
        screenshotFormat="image/png"
      />
      <TextField
        fullWidth
        id="username"
        label="Tên người dùng"
        variant="outlined"
        margin="normal"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="info" sx={{ width: "100%", mb: 2 }}>
          {message}
        </Alert>
      )}

      {instruction && (
        <Alert severity="info" sx={{ width: "100%", mb: 2 }}>
          {"Hãy để khuôn mặt theo hướng: " + instruction}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
      >
        Tạo người dùng
      </Button>
    </Box>
  );
}
