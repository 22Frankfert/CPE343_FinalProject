import React, { useState, useRef, useEffect } from "react";
import { redirect } from "react-router-dom";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
//import Card from '@mui/joy/Card';
// import { collection, addDoc } from "firebase/firestore";
import { db, auth, registerWithEmailAndPassword } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { AuthProvider, useAuth } from "./Auth";
import { Form, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const user = document.getElementById("user");

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const SignIn = () => {
    if (!email);
    registerWithEmailAndPassword(firstname, lastname, role, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/LogIn");
  }, [user, loading]);

  return (
    <div className="App">
      <h1 className="App-header">
        Web application development for patient screening and treatment
        suggestion in malaria
      </h1>
      <div className="App-LogIn">
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          <h2>ลงทะเบียน</h2>

          {/* <AuthProvider> */}
          {/* {currentUser.email} */}
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          {/* <Form onSubmit={handleSubmit}> */}
          {/* <Form.Label> */}
          <TextField
            required
            id="firstname"
            label="ชื่อ"
            sx={{ m: 4 }}
            variant="filled"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* </Form.Label> */}

          {/* <Form.Label> */}
          <TextField
            required
            id="lastname"
            label="นามสกุล"
            sx={{ m: 4 }}
            variant="filled"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {/* </Form.Label> */}
          <br></br>
          {/* <div> */}
          {/* <FormControl sx={{minWidth:250}}>
              <InputLabel id="role">ตำแหน่ง</InputLabel> */}

          {/* <Form.Label> */}
          <Select
            required
            displayEmpty
            // value={roleRef}
            labelId="role"
            id="role"
            label="ตำแหน่ง"
            sx={{ m: 4, width: 200 }}
            variant="filled"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem disabled value="">
              กรุณาเลือกตำแหน่ง
            </MenuItem>
            <MenuItem value="D">แพทย์</MenuItem>
            <MenuItem value="N">พยาบาล</MenuItem>
            <MenuItem value="T">นักเทคนิคการแพทย์</MenuItem>
            <MenuItem value="O">เจ้าพนักงานสาธารณสุข</MenuItem>
            <MenuItem value="S">ผู้เชี่ยวชาญด้านมาลาเรีย</MenuItem>
          </Select>
          {/* </Form.Label> */}
          {/* </FormControl> */}
          {/* </div> */}

          {/* <Form.Label> */}
          <TextField
            required
            id="email"
            label="อีเมล"
            sx={{ m: 4 }}
            variant="filled"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* </Form.Label> */}
          <br></br>

          {/* <Form.Label> */}
          <TextField
            required
            id="password"
            label="รหัสผ่าน"
            sx={{ m: 4 }}
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* </Form.Label> */}
          {/* <br></br> */}

          {/* <Form.Label> */}
          <TextField
            required
            id="confirmPassword"
            label="ยืนยันรหัสผ่านอีกครั้ง"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ m: 4 }}
            variant="filled"
          />
          {/* </Form.Label> */}

          <div>
            มีบัญชีผู้ใช้อยู่แล้ว?
            <Link to="/LogIn" sx={{ color: "#CE3A50" }}>
              เข้าสู่ระบบ
            </Link>
          </div>
          {/* <Button sx={{ color: "#CE3A50" }} variant="text" href="/LogIn">
              เข้าสู่ระบบ
            </Button> */}
          <Button
            sx={{ bgcolor: "#CE3A50" }}
            type="submit"
            onClick={SignIn}
            variant="contained"
          >
            ลงทะเบียน
          </Button>
          {/* </Form> */}
          {/* </AuthProvider> */}
        </Grid>
      </div>
    </div>
  );
};

export default Register;

{
  /* <style scoped>
    .App-loginBG {
    display: grid;
    grid-area: main;
    height: 500px;
    background-color: #F3C6C6;
}
</style> */
}
