import React, { useState, useRef, useEffect } from "react";
import { redirect } from "react-router-dom";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
//import Card from '@mui/joy/Card';
// import { collection, addDoc } from "firebase/firestore";
import { db, auth, registerWithEmailAndPassword } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {Link} from "react-router-dom";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { AuthProvider, useAuth } from "./Auth";
import {Form, Card, Alert} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const user = document.getElementById("user")

const Register = () => {
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [role, setRole] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    
    // const firstNameRef = useRef();
    // const lastNameRef = useRef();
    // const roleRef = useRef();
    // const [role, setRole] = useState("");
    // const emailRef = useRef();
    // const passwordRef = useRef();
    // const passwordConfirmRef = useRef();

    // const [formData, setFormData] = useState({
    //   firstNameRef: '',
    //   lastNameRef: '',
    //   roleRef:'',
    //   emailRef: '',
    //   passwordRef: '',
    //   passwordConfirmRef: '',
    //   });
    
    // const navigate = useNavigate()
    // const {Signup, currentUser} = useAuth()
    // const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)
    
    // const [currentUser,setCurrentUser] = useState(null);
    
    // const addUser = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const docRef = await addDoc(collection(db,"user"),{
    //             firstname: firstname,
    //             lastname:lastname,
    //             role:role,
    //             email:email,
    //             userId: user.uid,
    //         })
    //         console.log("Document written with ID:", docRef.id);
    //         // history("/LogIn")
    //     } catch(e){
    //         console.error("Error adding document",e);
    //     }
    // };
    

    //  async function handleSubmit (e) {
    //   e.preventDefault();

    //   if(passwordRef.current.value !==
    //     passwordConfirmRef.current.value){
    //       return alert('รหัสผ่านไม่ถูกต้อง')
    //     }
  //       const auth = getAuth();
  // const db = getFirestore();
        
        // try{
          // const user = Signup.user;
          // const docRef = await addDoc(collection(db, 'user'), {
          //   firstName: firstNameRef,
          //   lastName: lastNameRef,
          //   role: roleRef,
          //   email: emailRef,
          //   userId: user.uid,
          // });

          // setError('')
          // setLoading(true)
          // await Signup(emailRef.current.value, passwordRef.current.value) 
          // console.log('Document written with ID: ', docRef.id);
      //     navigate("/LogIn")
      //   } catch(error) {
      //     alert('สร้างบัญชีผู้ใช้ไม่สำเร็จ')
      //     // console.error('Error adding document: ', error);
      //   }
      //   setLoading(false)
      // };
      
      // const handleChange = (e) => {
      //   setRole(e.target.value)
      // };

    // const handleSubmit = event => {
    //     event.preventDefault()
    //     setUser({
    //         firstname:user.firstname.value,
    //         lastname:user.lastname.value,
    //         role: user.role.value,
    //         email: user.email.value,
    //         password: user.password.value,
    //     })
    // }
//   const [user, setUser] = useState({
//     firstname: "",
//     lastname: "",
//     role: "",
//     email: "",
//     password: "",
//   });
//   const addUser = async (e) => {
//     e.preventDefault();
//     db.collection("user").add(user);
//     setUser({
//         firstname:user.firstname.value,
//         lastname:user.lastname.value,
//         role: user.role.value,
//         email: user.email.value,
//         password: user.password.value,
//     });

//     const handleChange = e => {
//         setUser({...user, [e.target.name]:e.target.value});
//     }
//     try {
//         const docRef = await addDoc(collection(db,"user"),{
//             user: user
//         })
//         console.log("Document written with ID:", docRef.id);
//     }
//     catch(e){
//         console.error("Error adding document",e);
//     }
//   };
// const [formData, setFormData] = useRef({
//   firstName: '',
//   lastName: '',
//   role:'',
//   email: '',
//   password: '',
//   confirmPassword: '',
// });

// const handleFormSubmit = async (e) => {
//   e.preventDefault();
//   if (formData.password.current.value  !== formData.confirmPassword.current.value ) {
//     // display an error message or something
//     return setError("รหัสผ่านไม่ถูกต้อง");
//   }
//   const auth = getAuth();
//   const db = getFirestore();
//   try {
//     const userCredential = await createUserWithEmailAndPassword
//     (auth, formData.email, formData.password);
    
//     const user = userCredential.user;
//     const docRef = await addDoc(collection(db, 'user'), {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       role: formData.role,
//       email: formData.email,
//       userId: user.uid,
//     });
//     setLoading(false)
//     await Signup(formData.email.current.value, formData.password.current.value) 
//     console.log('Document written with ID: ', docRef.id);
//     navigate("/LogIn");
//   } catch (error) {
//     console.error('Error adding document: ', error);
//   }
//   setLoading(false)
// };
const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const SignIn = () => {
    if (!email) ;
    registerWithEmailAndPassword(firstname, lastname, role,email, password);
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
              // inputRef={firstNameRef}
              // onChange={(e) => setFirstname(e.target.value)}
              // value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
            />
            {/* </Form.Label> */}


            {/* <Form.Label> */}
            <TextField
              required
              id="lastname"
              label="นามสกุล"
              sx={{ m: 4 }}
              variant="filled"
              // inputRef={lastNameRef}
              // value={lastNameRef}
              // onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              // value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}// value={lastNameRef} onChange={(e) => setLastnameRef({ lastNameRef: e.target.value })}
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
              sx={{ m: 4, width:200 }}
              variant="filled"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              // value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              // onChange={handleChange}
              // inputRef={roleRef}
              // onChange={(e) => setRole(e.target.value)}
              // value={roleRef} onChange={(e) => setRoleRef({ roleRef: e.target.value })}
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
              // value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              // value={emailRef}
              // inputRef={emailRef}
              // onChange={(e) => setEmail(e.target.value)}
              // onClick={(e) => setCurrentUser(e.target.value)}
              // value={emailRef} onChange={(e) => setEmailRef({ emailRef: e.target.value })}
              
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
              // value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              // value={passwordRef}
              // inputRef={passwordRef}
              // onChange={(e) => setPassword(e.target.value)}
              // onClick={(e) => setCurrentUser(e.target.value)}
              // value={passwordRef} onChange={(e) => setPasswordRef({ passwordRef: e.target.value })} 
            />
            {/* </Form.Label> */}
            {/* <br></br> */}

            {/* <Form.Label> */}
            <TextField
              required
              id="confirmPassword"
              label="ยืนยันรหัสผ่านอีกครั้ง"
              type="password"
              // value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
              // value={passwordConfirmRef}
              // inputRef={passwordConfirmRef}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ m: 4 }}
              variant="filled"
              // value={passwordConfirmRef} onChange={(e) => setPasswordConfirmRef({ passwordConfirmRef: e.target.value })} 
              // onChange={(e) => setPassword(e.target.value)}
              
            />
            {/* </Form.Label> */}

            <div>มีบัญชีผู้ใช้อยู่แล้ว?
            <Link to="/LogIn" sx={{ color: "#CE3A50" }}>เข้าสู่ระบบ</Link>
            </div>
            {/* <Button sx={{ color: "#CE3A50" }} variant="text" href="/LogIn">
              เข้าสู่ระบบ
            </Button> */}
            <Button
              sx={{ bgcolor: "#CE3A50" }}
              type="submit"
              // onClick={addUser}
              // disabled={loading}
              // onSubmit={handleSubmit}
              // onClick={handleFormSubmit}
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
