import * as React from 'react';
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
// import ResponsiveAppBar from "./appBar"
import { useState } from 'react';
// import { collection, addDoc } from "firebase/storage";
import { storage } from "../firebase";
import  {ref}  from 'firebase/storage';
import { uploadBytesResumable, getDownloadURL, uploadBytes} from "firebase/storage";
import firebase from 'firebase/app';


const UploadFilm = () => {
  
  const [imgFile, setImgFile] = useState([]);
  const [percent, setPercent] = useState(0);

  
  // const [urls, setUrls] = useState([]);

  // const handleChange = (event) => {
  //   let images = [];
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     const newImage = event.target.files[i];
  //     images.push(URL.createObjectURL(event.target.files[i]));
  //     setImgFile(event.target.files)
  //   } 
  // }

  // const handleUpload = (files) => {
  //   const promises = [];
  //   imgFile.localeCompare((image)=>{

  //     if (!imgFile) {
  //       alert("Please choose a file first!")
  //       }
  //       if (imgFile.length <= 5 && imgFile.length <= 10) {
  //         // setImgFile( event.target.files)
  //         console.log("images must have more than 5.")
  //         // alert("images must have more than 5.")
  //       }
  //       // const storageRef = ref(storage, `/files/${imgFile.name}`);
  //       const uploadTask = storage.ref(`/files/${imgFile.name}`).put(image);
  //       promises.push(uploadTask) 
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const percent = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //             );
  //             setPercent(percent);
  //           },
  //           (error) => {console.log(error);},
  //           async() => {
  //             await storage
  //             .ref("imgFile")
  //             .child(image.name)
  //             .getDownloadURL()
  //             .then((urls)=>{
  //               setUrls((prevState) => [...prevState, urls]);
  //             })
  //             // getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //             //   console.log(url);
  //         });
  //         }
  //         );
  //         Promise.all(promises)
  //         .then(()=> alert ("All images uploaded"))
  //         .catch((err) => console.log(err));

  const handleFileInputChange = (event) => {
    // const files = [];
    for (let i = 0; i < event.target.files.length; i++){  
    // if (files && files.length > 0) {
      // Limit the number of selected files to a range of 5-10 images
      // const slicedFiles = Array.from(files).slice(0, Math.min(10, Math.max(5, files.length)));
      // .slice(0, Math.min(10, Math.max(5, files.length)))
      setImgFile([...imgFile, ...Array.from(event.target.files)]);

      // for (let i = 0; i < event.target.files.length; i++){   
      //   const newImage = event.target.files[i];
      //   newImage["id"] = Math.random();
      //   setImgFile((prevState)=>[...prevState, newImage])
      //   // setImgFile([...imgFile, ...Array.from(event.target.files)]);
      }}
  //   }
  // };

  const handleUploadButtonClick = () => {
    // const folderPath = 'files/${Date.now()}/';
    // const promises = imgFile.map((file) => {
      //${Date.now()}/
      // const promises = [];
      const uploadFolder = Date.now().toString();
      imgFile.map((file) => {
        const storageRef = ref(storage, `/${uploadFolder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
    //     // promises.push(uploadTask)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
          const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
            setPercent(percent);
          },
          (err) => console.log(err),
            () => {
     
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          });
          }
          );
      });
    }
// console.log("images:", imgFile);
// console.log("urls:", urls)
// const [selectedFiles, setSelectedFiles] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [downloadURLs, setDownloadURLs] = useState([]);

//   const handleFileSelect = (event) => {
//     setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
//   };

//   const handleUpload = async () => {
//     const uploadFolder = Date.now().toString();
//     const promises = selectedFiles.map((file) => {
//       const path = `${uploadFolder}/${file.name}`;
//       const storageRef = storage().ref().child(path);
//       const uploadTask = storageRef.put(file);

//       return new Promise((resolve, reject) => {
//         uploadTask.on(
//           'state_changed',
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setProgress(progress);
//           },
//           reject,
//           async () => {
//             const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
//             resolve(downloadURL);
//           }
//         );
//       });
//     });

//     try {
//       const urls = await Promise.all(promises);
//       setDownloadURLs(urls);
//       setSelectedFiles([]);
//       setProgress(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  

  return (
    <div className='App'>
      <div className='App-main'>
      <h1 className="App-result">อัปโหลดรูปฟิล์มเลือด</h1>
        <Grid container wrap="nowwrap"
          sx={{ borderRadius: 2, p: 20 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500">

          <IconButton color="#CE3A50" aria-label="upload picture" component="label">
            <input  multiple type="file" onChange={handleFileInputChange} />
            {/* <PhotoCamera /> */}
          </IconButton><br/>
          <Button sx={{bgcolor:"#CE3A50", m:2}} variant="contained" component="label" onClick={handleUploadButtonClick}>
            อัปโหลด
            
          </Button>

        </Grid>
      </div>
    </div>
  );
};

export default UploadFilm;
