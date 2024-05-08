import * as React from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { storage } from "../firebase";
import { ref } from "firebase/storage";
import {
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const UploadFilm = ({ case_id }) => {
  const [imgFile, setImgFile] = useState([]);
  const [percent, setPercent] = useState(0);
  const [caseId, setCaseId] = useState(null);

  const [loadingModal, setLoadingModal] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [loadingIcon, setLoadingIcon] = useState(true);
  const [successIcon, setSuccessIcon] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);

  const handleFileInputChange = (event) => {
    setImgFile(event.target.files);
    setCaseId(case_id.toString());
  };

  const handleUploadButtonClick = () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      formData.append("originalImage", imgFile[i]);
    }
    formData.append("case_id", caseId);
    setLoadingModal(true);
    const res = axios
      .post("http://127.0.0.1:8000/api/case/uploadimg", formData, {
        headers: {
          "x-user-id": localStorage.getItem("x-user-id"),
        },
      })
      .then(() => {
        setLoadingModal(true);
        setTextModal("กำลังวิเคราะห์ผล กรุณารอสักครู่...");
        setLoadingIcon(true);

        axios
          .post("http://127.0.0.1:8000/api/case/test", { case_id: caseId })
          .then((res) => {
            // console.log(data);
            if (res.status === 201) {
              setLoadingIcon(false);
              setTextModal(
                "วิเคราะห์เสร็จสิ้น โปรดกดปุ่มเสร็จสิ้นที่มุมขวาล่าง"
              );
              setSuccessIcon(true);
              setTimeout(() => {
                setSuccessIcon(false);
                setLoadingModal(false);
              }, 2000);
            }
          });
      });
  };
  console.log("loadingModal is:", loadingModal); // <-- add this

  return (
    <div className="App">
      <div className="App-main">
        <h1 className="App-result">อัปโหลดรูปฟิล์มเลือด {caseId}</h1>
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 20 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          {/* <IconButton
            color="#CE3A50"
            aria-label="upload picture"
            component="label"
          > */}
          <input multiple type="file" onChange={handleFileInputChange} />
          {/* <PhotoCamera /> */}
          {/* </IconButton> */}
          <br />
          <Button
            sx={{ bgcolor: "#CE3A50", m: 2 }}
            variant="contained"
            component="label"
            onClick={handleUploadButtonClick}
          >
            อัปโหลด
          </Button>
          {loadingModal && (
            <div
              style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                zIndex: 99,
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  position: "absolute",
                  zIndex: 10,
                  width: "350px",
                  height: "145px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span> {textModal && <div>{textModal}</div>}</span>

                  {loadingIcon && (
                    <CircularProgress
                      color="inherit"
                      sx={{ marginTop: "10px", fontSize: 40 }}
                    />
                  )}
                  {successIcon && (
                    <CheckCircleOutlineIcon
                      color="success"
                      sx={{ marginTop: "10px", fontSize: 40 }}
                    />
                  )}
                  {errorIcon && (
                    <ErrorOutlineIcon
                      sx={{
                        color: "#e54059",
                        marginTop: "10px",
                        fontSize: 40,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default UploadFilm;
