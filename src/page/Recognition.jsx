import { Box, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadImage } from "../service/ImageService";
import { recognizeByFacenet } from "../service/FacenetService";
import { recognizeByArcface } from "../service/ArcFaceService";
export default function Recognition() {
  const [arcfaceUser, setArcfaceUser] = useState({ user_id: "", name: "" });
  const [facenetUser, setFacenetUser] = useState({ user_id: "", name: "" });
  const [error, setError] = useState("");
  const webcamRef = useRef(null);
  const upload = async () => {
    try {
      const imageSrc = await webcamRef.current.getScreenshot();
      const response = await uploadImage(imageSrc);
      if (response.detail.code == 200) {
        const id = response.detail.data.image_id;
        return id;
      }
      setError("Ảnh chưa upload thành công");
      return -1;
    } catch (error) {
      console.error(error);
    }
  };
  const handleCapture = async () => {
    const id = await upload();
    if (id != -1) {
      const facenetResult = await recognizeByFacenet(id);
      const arcfaceResult = await recognizeByArcface(id);
      if (facenetResult.detail.code == 200) {
        setFacenetUser({
          user_id: facenetResult.detail.data.id,
          name: facenetResult.detail.data.username,
        });
        setError("");
      } else if (facenetResult.detail.code == 404) {
        setError("Người dùng chưa có trong hệ thống");
        setFacenetUser({ user_id: "", name: "" });
      } else if (facenetResult.detail.code == 400) {
        setError("Không có khuôn mặt trong ảnh");
        setFacenetUser({ user_id: "", name: "" });
      }
      if (arcfaceResult.detail.code == 200) {
        setArcfaceUser({
          user_id: arcfaceResult.detail.data.id,
          name: arcfaceResult.detail.data.username,
        });
        setError("");
      } else if (arcfaceResult.detail.code == 404) {
        setError("Người dùng chưa có trong hệ thống");
        setArcfaceUser({ user_id: "", name: "" });
      } else if (arcfaceResult.detail.code == 400) {
        setError("Không có khuôn mặt trong ảnh");
        setArcfaceUser({ user_id: "", name: "" });
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "top",
        height: "100vh",
      }}
    >
      <Box component="h1" style={{marginBottom: "40px"}}>Điểm Danh</Box>
      <Webcam
        ref={webcamRef}
        style={{ marginBottom: "20px" }}
        screenshotFormat="image/png"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {facenetUser.user_id != "" && (
        <div>
          <p>Facenet: {facenetUser.name}</p>
        </div>
      )}
      {arcfaceUser.user_id != "" && (
        <div>
          <p>Arcface: {arcfaceUser.name}</p>
        </div>
      )}
      <Button variant="contained" onClick={handleCapture}>
        Capture
      </Button>
    </Box>
  );
}
