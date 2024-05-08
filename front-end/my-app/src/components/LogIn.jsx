import React, {useContext, useRef, useState, useEffect} from "react";
import { TextField } from "@mui/material";
import {Button} from "@mui/material";
//import Card from '@mui/joy/Card';
import Grid from '@mui/material/Grid';
import {auth, logInWithEmailAndPassword} from "../firebase"
import { redirect, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "./Auth";
import { Link } from "react-router-dom";
import {Form, Alert} from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,} from 'firebase/auth';
  import { useAuthState } from "react-firebase-hooks/auth";

const LogIn = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  // const {Login} = useAuth()
  // const [error, setError] = useState('')
  // const [loading, setLoading] = useState(false)
  
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });
  // const [error, setError] = useState(null);

  // async function handleSubmit (e) {
    // e.preventDefault();
    // if(passwordRef.current.value !==
    //   passwordConfirmRef.current.value){
    //     return alert('รหัสผ่านไม่ถูกต้อง')
    //   }
      //    try{
      //   setError('')
      //   setLoading(false)
      //   await Login(emailRef.current.value, passwordRef.current.value) 
      //   navigate("/");
      // } catch {
      //   setError('Failed to create an account')
      // }
      // setLoading(false)

    // e.preventDefault();
    // const auth = getAuth();
    // try {
    //   await signInWithEmailAndPassword(auth, formData.email, formData.password);
    //   history("/");
    // } catch (error) {
    //   console.error("Error logging in: ", error);
    //   setError("Invalid email or password. Please try again.");
    // }

    // e.preventDefault();
    // const auth = getAuth();
    // try {
    //   const userCredential = await signInWithEmailAndPassword(
    //     auth,
    //     formData.email,
    //     formData.password
    //   );
    //   console.log(userCredential);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   alert('รหัสผ่านไม่ถูกต้อง',error)
    // }
  // }

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const {currentUser} = useContext(AuthContext);
  // if (currentUser) {
  //   return <redirect to="/"/>
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    // if (loading) {
    //   // maybe trigger a loading screen
    //   return;
    // }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="App">
      <h1 className="App-header">
        Web application development for patient screening and treatment suggestion in malaria
      </h1>
      <div className="App-LogIn">
        <Grid container wrap="nowwrap"
          sx={{borderRadius:2}}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500">
          <h2>
            เข้าสู่ระบบ
          </h2>
          {/* <Form onSubmit={handleSubmit}> */}
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <TextField
            required
            id="email"
            label="อีเมล"
            sx={{m:4}}
            variant="filled"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // inputRef={emailRef}
              //onChange={handleChange}
              // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          >
          </TextField>
          <br></br>
          <TextField
            required
            id="password"
            label="รหัสผ่าน"
            sx={{m:4}}
            variant="filled"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // inputRef={passwordRef}
              // onChange={handleChange}
              // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          >
          </TextField>
          <br></br>
          <div>ยังไม่มีบัญชีผู้ใช้? <Link to="/Register" sx={{color:"#CE3A50"}} >ลงทะเบียน</Link> </div>
          {/* <Button sx={{color:"#CE3A50"}} variant="text" href="/Register">ลงทะเบียน</Button> */}
                        
          <Button sx={{m:4, bgcolor:"#CE3A50"}} type="submit" variant="contained" 
          // disabled={loading} 
          onClick={() => logInWithEmailAndPassword(email, password)}
          >เข้าสู่ระบบ</Button>
          {/* </Form> */}
        </Grid>
      </div>
    </div>
  );
}
export default LogIn;
