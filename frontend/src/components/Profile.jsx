import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./appBar";
import { TextField } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { auth, logout, db } from "../firebase";
import { AuthContext } from "./Auth";
import { redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  QuerySnapshot,
} from "firebase/firestore";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [docId, setDocId] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(
        collection(db, "user"),
        where("userId", "==", user?.uid, doc)
      );

      const documentSnapshot = await getDocs(q).then(
        (querySnapshot) => querySnapshot.docs[0]
      );
      const data = documentSnapshot.data();
      console.log("Document IDs:", documentSnapshot.id);

      setFirstName(data.firstName);
      setLastname(data.lastName);
      setRole(data.role);
      setDocId(documentSnapshot.id);
      // setDocId(documentSnapshot.id);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/LogIn");
    fetchUserName();
  }, [user, loading]);
  const displayRole = () => {
    switch (role) {
      case "D":
        return "แพทย์";
      case "N":
        return "พยาบาล";
      case "T":
        return "นักเทคนิคการแพทย์";
      case "O":
        return "เจ้าพนักงานสาธารณสุข";
      case "S":
        return "ผู้เชี่ยวชาญด้านมาลาเรีย";
      default:
        return "";
    }
  };

  return (
    <div className="App">
      <ResponsiveAppBar />
      <div className="App-main">
        <h1 className="App-profile">บัญชีผู้ใช้</h1>
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 10 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
          // flexDirection= "column"
        >
          {/* <Column1> */}
          {/* <Box
      height="100vh"
      sx={{
        flexGrow: 1,
        bgcolor: "#F4F8EA",
        pt: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    > */}
          <div
            style={{
              display: "flex",
              // backgroundColor: "white",
              padding: "50px",
              // borderRadius: 4,
              // border: "1px solid #D4D4D4",
            }}
          >
            <div style={{ marginRight: "30px" }}>
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: "#785e56",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  fontSize: 50,
                }}
                // src={image}
              >
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Avatar>
            </div>
            {/* </Column1> */}
            {/* <Avatar variant='rounded' sx={{mr:10 ,width:120, height:120}} src="previewImages"></Avatar> */}
            {/* <Column2> */}
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <TextField sx={{m:2}} id="outlined-read-only-input" defaultValue="ชื่อ-นามสกุล" InputProps={{eadOnly: true }}> */}
              <Grid
                sx={{ m: 2, p: 4, backgroundColor: "white", borderRadius: 2 }}
              >
                <Typography sx={{ fontWeight: 600 }}>ชื่อผู้ใช้:</Typography>
                <Typography>
                  {/* {" "} */}
                  {firstName} {lastName}
                </Typography>
                {/* <p>id {docId}</p> */}
              </Grid>

              <Grid
                sx={{ m: 2, p: 4, backgroundColor: "white", borderRadius: 2 }}
              >
                <Typography sx={{ fontWeight: 600 }}>อีเมล:</Typography>
                <Typography> {user?.email}</Typography>
              </Grid>

              <Grid
                sx={{ m: 2, p: 4, backgroundColor: "white", borderRadius: 2 }}
              >
                {/* <Typography>{displayRole}</Typography> */}
                <Typography sx={{ fontWeight: 600 }}>ตำแหน่ง:</Typography>
                <Typography>{role && <p> {displayRole()}</p>}</Typography>
              </Grid>
              {/* </TextField> */}
              {/* <TextField sx={{m:2}} id="outlined-read-only-input" defaultValue="อีเมล" InputProps={{readOnly: true,}}></TextField>
          <TextField sx={{m:2}} id="outlined-read-only-input" defaultValue="ตำแหน่ง" InputProps={{readOnly: true,}}></TextField> */}
            </div>
            {/* </Column2> */}
            {/* <Typography>name</Typography>
          <Typography>Email</Typography>
          <Typography>role</Typography> */}
            {/* <Button sx={{bgcolor:"#CE3A50",m:4}} variant="contained" >แก้ไขข้อมูลส่วนตัว</Button> */}
          </div>
          <Button
            sx={{ bgcolor: "#CE3A50" }}
            variant="contained"
            onClick={logout}
          >
            ออกจากระบบ
          </Button>
          {/* </Box> */}
        </Grid>
      </div>
    </div>
  );
};
export default Profile;
