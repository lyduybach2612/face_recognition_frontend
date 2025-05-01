import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadImage } from "../service/ImageService";
import { recognizeByFacenet } from "../service/FacenetService";
import { recognizeByArcface } from "../service/ArcFaceService";
import { attendence } from "../service/AttendanceService";
export default function Recognition() {
  const [arcfaceUser, setArcfaceUser] = useState({ id: "", name: "" });
  const [facenetUser, setFacenetUser] = useState({ id: "", name: "" });
  const [facenetError, setFacenetError] = useState("");
  const [arcfaceError, setArcfaceError] = useState("");
  const [error, setError] = useState("");
  const webcamRef = useRef(null);
  const [classId, setClassId] = useState("");
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
    setArcfaceError("");
    setFacenetError("");
    setError("");
    setArcfaceUser({ id: "", name: "" });
    setFacenetUser({ id: "", name: "" });
    const id = await upload();
    if (id != -1) {
      const facenetResult = await recognizeByFacenet(id);
      const arcfaceResult = await recognizeByArcface(id);
      if (facenetResult.detail.code == 200) {
        setFacenetUser({
          id: facenetResult.detail.data.id,
          name: facenetResult.detail.data.name,
        });
        setError("");
        if(classId != ""){
          const response = await attendence(classId, facenetUser.id);
          console.log(response);
        }
      } else if (facenetResult.detail.code == 404) {
        setFacenetError("Người dùng chưa có trong hệ thống");
        setFacenetUser({ id: "", name: "" });
      } else if (facenetResult.detail.code == 400) {
        setFacenetError("Không có khuôn mặt trong ảnh");
        setFacenetUser({ id: "", name: "" });
      }
      if (arcfaceResult.detail.code == 200) {
        setArcfaceUser({
          id: arcfaceResult.detail.data.id,
          name: arcfaceResult.detail.data.name,
        });
        setError("");
      } else if (arcfaceResult.detail.code == 404) {
        setArcfaceError("Người dùng chưa có trong hệ thống");
        setArcfaceUser({ id: "", name: "" });
      } else if (arcfaceResult.detail.code == 400) {
        setArcfaceError("Không có khuôn mặt trong ảnh");
        setArcfaceUser({ id: "", name: "" });
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
      <Box component="h1" style={{ marginBottom: "40px" }}>
        Điểm Danh
      </Box>
      <Alert severity="warning" sx={{marginBottom: "20px  .\venv\Scripts\activate"}} >Lưu ý: Không nhắm mắt, che miệng, che mũi trong quá trình thêm người dùng</Alert>
      <Webcam
        ref={webcamRef}
        style={{ marginBottom: "20px" }}
        screenshotFormat="image/png"
        mirrored={true}
      />
      {error && (
        <Alert sx={{ marginBottom: "10px" }} severity="error">
          {error}
        </Alert>
      )}
      {arcfaceError && (
        <Alert sx={{ marginBottom: "10px" }} severity="error">
          Arcface: {arcfaceError}
        </Alert>
      )}
      {facenetError && (
        <Alert sx={{ marginBottom: "10px" }} severity="error">
          Facenet: {facenetError}
        </Alert>
      )}
      {facenetUser.id != "" && (
        <Alert sx={{ marginBottom: "10px" }} severity="success">
          Facenet: {facenetUser.name}
        </Alert>
      )}
      {arcfaceUser.id != "" && (
        <Alert sx={{ marginBottom: "10px" }} severity="success">
          Arcface: {arcfaceUser.name}
        </Alert>
      )}
      <TextField
        id="username"
        label="Mã lớp"
        variant="outlined"
        margin="normal"
        onChange={(e) => setClassId(e.target.value)}
        required
      />
      <Button variant="contained" onClick={handleCapture}>
        Capture
      </Button>
    </Box>
  );
}
