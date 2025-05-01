import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Recognition from "./page/Recognition";
import UserCreation from "./page/UserCreation";
import Layout from "./page/Layout";
import Class from "./page/Class";
import Attendance from "./page/Attendance";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<Recognition />} />
          <Route path="users/new" element={<UserCreation />} />
          <Route path="class" element = {<Class/>} />
          <Route path="attendance" element = {<Attendance/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
