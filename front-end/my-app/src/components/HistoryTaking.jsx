import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, Hidden, InputLabel } from '@mui/material';
import {TextField} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Select} from '@mui/material';
import ReactDOM from "react-dom";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import {Button} from "@mui/material";
import {Grid} from '@mui/material';
import { Component } from 'react';
import provinces from './province'

import InputAddress from 'react-thailand-address-autocomplete'
// import InputThaiAddress from 'thai-address-autocomplete-react'

// import ResponsiveAppBar from "./appBar"

// const handleChange = (event) => {
//   setAge(event.target.value);
// };

// function yesnoCheck() {
//   if (document.getElementById('yesCheck').checked) {
//       document.getElementById('ifYes').style.visibility = 'visible';
//   }
//   else document.getElementById('ifYes').style.visibility = 'hidden';

// }




function HistoryTaking() {
  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };

  console.log(selected);

  // const [province, setProvince] = React.useState('');

  // const handleChange = (event) => {
  //   setProvince(event.target.value);
  // };
  

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [underlying_disease, setUnderlying_disease] = useState([]);
  const [province, setProvince] = useState("");
  const [travel_history, setTravel_history] = useState("");
  const [drug_allergy, setDrug_allergy] = useState("");
  const [taking_medicine, setTaking_medicine] = useState("");
  const [malaria_history, setMalaria_history] = useState("");
  const [urine_amount, setUrine_amount] = useState("");
  const [urine_color, setUrine_color] = useState("");
  const [convulsions, setConvulsions] = useState("");
  const [comatose, setComatose] = useState("");
  const [bleeding, setBleeding] = useState("");
  const [fatigue, setFatigue] = useState("");
  const [asthma, setAsthma] = useState("");
  const [refer, setRefer] = useState("");

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setUnderlying_disease([...underlying_disease, value]);
    } else {
      setUnderlying_disease(underlying_disease.filter((val) => val !== value));
    }
  };

  const handleTravelHistoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setTravel_history([...travel_history, value]);
    } else {
      setTravel_history(travel_history.filter((val) => val !== value));
    }
  };

  const handleTakingMedicineChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setTaking_medicine([...taking_medicine, value]);
    } else {
      setTaking_medicine(taking_medicine.filter((val) => val !== value));
    }
  };

  const handleMalariaHistoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setMalaria_history([...malaria_history, value]);
    } else {
      setMalaria_history(malaria_history.filter((val) => val !== value));
    }
  };

  const handleAsthmaChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setAsthma([...asthma, value]);
    } else {
      setAsthma(asthma.filter((val) => val !== value));
    }
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const addPatient = async (e) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db,"patient"),{
          age: age,
          gender:gender,
          weight:weight,
          temperature:temperature,
          underlying_disease:underlying_disease,
          province:province,
          travel_history:travel_history,
          drug_allergy:drug_allergy,
          taking_medicine:taking_medicine,
          malaria_history:malaria_history,
          urine_amount:urine_amount,
          urine_color:urine_color,
          convulsions:convulsions,
          comatose:comatose,
          bleeding:bleeding,
          fatigue:fatigue,
          asthma:asthma,
          refer:refer,
          
        })
        console.log("Document written with ID:", docRef.id);
    } catch(e){
        console.error("Error adding document",e);
    }
    };

    // const state = {
    //   thaiprovince: "", // jangwat
    //   zipcode: "", // postal code
    // }
    // const onSelect = (e) => {
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   })
    // };
  
    // const onProvince = (fullAddress) => {
    //   const { thaiprovince, zipcode } = fullAddress
    //   this.setState({
    //     thaiprovince,
    //     zipcode
    //   })
    // };
    // const {
    //   thaiprovince,
    //   zipcode,
    // } = this.state

    // const onChange = (e) => {
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   })
    // };
  
    // const onSelect = (fullAddress) => {
    //   const { subdistrict, district, selectProvince, zipcode } = fullAddress
    //   this.setState({
    //     subdistrict,
    //     district,
    //     selectProvince,
    //     zipcode
    //   })
    // };
    
    
  return (
    
    <div className='App'>
      
      <h2 className="App-result">ข้อมูลการซักประวัติ</h2>
      <TextField
        required
        defaultValue="Case ID" 
        id="case_id"
        InputProps={{readOnly: true}}
        sx={{m:4}}/>
      

      
      <div className='App-info'>
      <Grid
          container
          sx={{ borderRadius: 2,p:6}}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
        {/* <FormControl>
        จังหวัด
        <InputAddress
          address="province"
          value={this.state.province}
          onChange={this.onChange}
          onSelect={this.onSelect}
        />
        </FormControl> */}

        <FormControl sx={{m:2}}>
          <FormLabel id="age">อายุ<dd>หากอายุไม่ถึง 1 ปีให้ระบุเป็นเลขทศนิยม เช่น อายุ 5 เดือนโปรดระบุว่า อายุ 0.5 ปี</dd></FormLabel>
          <TextField  required sx={{bgcolor:"white"}} type="number" name="age" InputLabelProps={{
            shrink: true,
          }} onChange={(e) => setAge(e.target.value)}></TextField>
        </FormControl>
        <br></br>
        

        <FormControl sx={{m:2}}>
          <FormLabel id="gender">เพศ</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              name="gender"
              onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel value="ชาย" control={<Radio/>} label="ชาย"></FormControlLabel>
                <FormControlLabel value="หญิง"  control={<Radio/>} id="female" label="หญิง">
                {/* <div aria-hidden={selected!=="female"?true:false}>

                </div> */}
                </FormControlLabel>
                <FormControlLabel sx={{ml:2}} value="กำลังตั้งครรภ์หรือมีแผนในการมีลูก" control={<Radio/>} label="กำลังตั้งครรภ์ หรือมีแผนในการมีลูก" ></FormControlLabel>
                <FormControlLabel sx={{ml:2}} value="ไม่ได้กำลังตั้งครรภ์แต่มีแผนในการมีลูก" control={<Radio/>} label=" ไม่ได้กำลังตั้งครรภ์แต่มีแผนในการมีลูก"></FormControlLabel>
                <FormControlLabel sx={{ml:2}} value="กำลังให้นมบุตร" control={<Radio/>} label="กำลังให้นมบุตร"></FormControlLabel>
                  
            </RadioGroup>
            

           
                
                {/* <FormControlLabel value="gender5" control={<Radio/>} label="อื่น ๆ"></FormControlLabel> */}
        </FormControl>
        <br></br>

        <FormControl sx={{m:2}}>
          <FormLabel id="weight">น้ำหนัก</FormLabel>
          <TextField required sx={{bgcolor:"white"}} type="number" name="weight" InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setWeight(e.target.value)}></TextField>
        </FormControl>
        <br></br>

        <FormControl sx={{m:2}}>
            <FormLabel id="temperature">อุณหภูมิร่างกาย</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="temperature"
              onChange={(e) => setTemperature(e.target.value)}
            >
              <FormControlLabel value="มากกว่า 39 องศา" control={<Radio />} label="มากกว่า 39 องศา" />
              <FormControlLabel value="น้อยกว่า 39 องศา" control={<Radio />} label="น้อยกว่า 39 องศา" />
            </RadioGroup>
          </FormControl>
          <br></br>
        

        <FormControl sx={{m:2}}>
          <FormLabel id="underlying_disease">มีโรคประจำตัวหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              name="underlying_disease"
              onChange={(e) => setUnderlying_disease(e.target.value)}>
                <FormControlLabel value="ไม่มี" control={<Radio/>} label="ไม่มี"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('ภาวะพร่องเอ็นไซม์')} onChange={handleCheckboxChange}value="ภาวะพร่องเอ็นไซม์" control={<Checkbox/>} label="ภาวะพร่องเอ็นไซม์"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('จี-6-พีดี')} onChange={handleCheckboxChange}value="จี-6-พีดี" control={<Checkbox/>} label="จี-6-พีดี "></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคอ้วน')} onChange={handleCheckboxChange}value="โรคอ้วน" control={<Checkbox/>} label="โรคอ้วน"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคตับ')} onChange={handleCheckboxChange}value="โรคตับ" control={<Checkbox/>} label="โรคตับ"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคไต')} onChange={handleCheckboxChange}value="โรคไต" control={<Checkbox/>} label="โรคไต"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคเบาหวาน')} onChange={handleCheckboxChange}value="โรคเบาหวาน" control={<Checkbox/>} label="โรคเบาหวาน"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคความดันโลหิตสูง')} onChange={handleCheckboxChange}value="โรคความดันโลหิตสูง" control={<Checkbox/>} label="โรคความดันโลหิตสูง"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('อื่น ๆ')} onChange={handleCheckboxChange}value="อื่น ๆ" control={<Checkbox/>} label="อื่น ๆ"></FormControlLabel>
                <TextField sx={{ml:4, bgcolor:"white"}} label="โปรดระบุ" variant='outlined'></TextField>
            </RadioGroup>
        </FormControl>
        <br></br>
        

        <FormControl sx={{m:2,minWidth:300}}>
          <FormLabel id="province">คุณอาศัยอยู่ในจังหวัดอะไร</FormLabel>
          <Select 
            labelId='demo-simple-select-label'
            id='province'
            value={province}
            onClick={handleProvinceChange}
            label="โปรดเลือกจังหวัดที่อยู่อาศัย"
            sx={{bgcolor:"white"}}
            
            // onChange={(e) => setProvince(e.target.value)}
            >
              {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}

          </Select>

          {/* <InputAddress
          address="province"
          id='provinceSelect'
          value={this.state.selectProvince}
          onChange={(e) => setProvince(e.target.value)}
          onSelect={this.onSelect}
        /> */}

        </FormControl>
        <br/>
        {/* <FormControl sx={{m:2,minWidth:300}}>
        <InputThaiAddress
          field={"thaiprovince"}
          value={province}
          onSelect={this.onSelect("thaiprovince")}
          onProvince={this.onProvince}
        />
      </FormControl> */}


        

        <FormControl sx={{m:2}}>
            <FormLabel id="travel_history">มีประวัติการเดินทางไปยังพื้นที่เสี่ยงอย่างน้อย  1 เดือนที่ผ่านมาหรือไม่</FormLabel>
            <dd>พื้นที่เสี่ยงมาลาเรีย ได้แก่ ตาก กาญจนบุรี ราชบุรี แม่ฮ่องสอน ยะลา ศรีสะเกษ ประจวบคีรีขันธ์ ชุมพร เพชรบุรี ระนอง สงขลา อุบลราชธานี</dd>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="travel_history"
              onChange={(e) => setTravel_history(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />

              <FormControlLabel sx={{ml:2}} checked={travel_history.includes('ในประเทศไทย')} onChange={handleTravelHistoryChange}value="ในประเทศไทย" control={<Radio/>} label="ในประเทศไทย" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ตาก')} onChange={handleTravelHistoryChange}value="ตาก" control={<Checkbox/>} label="ตาก" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('กาญจนบุรี')} onChange={handleTravelHistoryChange}value="กาญจนบุรี" control={<Checkbox/>} label="กาญจนบุรี" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ตราด')} onChange={handleTravelHistoryChange}value="ตราด" control={<Checkbox/>} label="ตราด" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ราชบุรี')} onChange={handleTravelHistoryChange}value="ราชบุรี" control={<Checkbox/>} label="ราชบุรี" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('แม่ฮ่องสอน')} onChange={handleTravelHistoryChange}value="แม่ฮ่องสอน" control={<Checkbox/>} label="แม่ฮ่องสอน" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ยะลา')} onChange={handleTravelHistoryChange}value="ยะลา" control={<Checkbox/>} label="ยะลา" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ศรีสะเกษ')} onChange={handleTravelHistoryChange}value="ศรีสะเกษ" control={<Checkbox/>} label="ศรีสะเกษ" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('จันทบุรี')} onChange={handleTravelHistoryChange}value="จันทบุรี" control={<Checkbox/>} label="จันทบุรี" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ประจวบคีรีขันธ์')} onChange={handleTravelHistoryChange}value="ประจวบคีรีขันธ์" control={<Checkbox/>} label="ประจวบคีรีขันธ์" ></FormControlLabel>

              <FormControlLabel sx={{ml:2}} checked={travel_history.includes('ต่างประเทศ')} onChange={handleTravelHistoryChange}value="ต่างประเทศ" control={<Radio/>} label="ต่างประเทศ" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ประเทศแถบแอฟริกา')} onChange={handleTravelHistoryChange}value="ประเทศแถบแอฟริกา" control={<Checkbox/>} label="ประเทศแถบแอฟริกา" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ประเทศแถบหมู่เกาะแปซิฟิกตอนใต้')} onChange={handleTravelHistoryChange}value="ประเทศแถบหมู่เกาะแปซิฟิกตอนใต้" control={<Checkbox/>} label="ประเทศแถบหมู่เกาะแปซิฟิกตอนใต้" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ปาปัวนิวกินี')} onChange={handleTravelHistoryChange}value="ปาปัวนิวกินี" control={<Checkbox/>} label="ปาปัวนิวกินี" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('เมียนมาร์')} onChange={handleTravelHistoryChange}value="เมียนมาร์" control={<Checkbox/>} label="เมียนมาร์" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('ลาว')} onChange={handleTravelHistoryChange}value="ลาว" control={<Checkbox/>} label="ลาว" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('กัมพูชา')} onChange={handleTravelHistoryChange}value="กัมพูชา" control={<Checkbox/>} label="กัมพูชา" ></FormControlLabel>
              <FormControlLabel sx={{ml:10}} checked={travel_history.includes('มาเลเซีย')} onChange={handleTravelHistoryChange}value="มาเลเซีย" control={<Checkbox/>} label="มาเลเซีย" ></FormControlLabel>


              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

      

        <FormControl sx={{m:2}}>
            <FormLabel id="drug_allergy">มีประวัติการแพ้ยาต้านมาลาเรียหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="drug_allergy"
              onChange={(e) => setDrug_allergy(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

          <FormControl sx={{m:2}}>
            <FormLabel id="taking_medicine">อาการหลังจากรับประทานยาเม็ดของผู้ป่วย</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="taking_medicine"
              onChange={(e) => setTaking_medicine(e.target.value)}
            >
              <FormControlLabel checked={taking_medicine.includes('รับประทานยาแล้วอาเจียน')} onChange={handleTakingMedicineChange}value="รับประทานยาแล้วอาเจียน" control={<Checkbox />} label="รับประทานยาแล้วอาเจียน" />
              <FormControlLabel checked={taking_medicine.includes('รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง')} onChange={handleTakingMedicineChange}value="รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" control={<Checkbox />} label="รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" />
              <FormControlLabel checked={taking_medicine.includes('ไม่สามารถรับประทานยาเม็ดได้')} onChange={handleTakingMedicineChange}value="ไม่สามารถรับประทานยาเม็ดได้" control={<Checkbox />} label="ไม่สามารถรับประทานยาเม็ดได้" />
              <FormControlLabel value="ไม่มีอาการดังกล่าว" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>


        <FormControl sx={{m:2}}>
            <FormLabel id="malaria_history">ประวัติการติดเชื้อมาลาเรียในช่วง 1 ปีที่ผ่านมา และโปรดระบุสปีชีส์ที่ติด</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="malaria_history"
              onChange={(e) => setMalaria_history(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />

              <FormControlLabel sx={{ml:2}} checked={malaria_history.includes('P. falciparum')} onChange={handleMalariaHistoryChange}value="P. falciparum" control={<Checkbox/>} label="P. falciparum" ></FormControlLabel>
              <FormControlLabel sx={{ml:2}} checked={malaria_history.includes('P. vivax')} onChange={handleMalariaHistoryChange}value="P. vivax" control={<Checkbox/>} label="P. vivax" ></FormControlLabel>
              <FormControlLabel sx={{ml:2}} checked={malaria_history.includes('P. malariae')} onChange={handleMalariaHistoryChange}value="P. malariae" control={<Checkbox/>} label="P. malariae" ></FormControlLabel>
              <FormControlLabel sx={{ml:2}} checked={malaria_history.includes('P. ovale')} onChange={handleMalariaHistoryChange}value="P. ovale" control={<Checkbox/>} label="P. ovale" ></FormControlLabel>
              <FormControlLabel sx={{ml:2}} checked={malaria_history.includes('P. knowlesi')} onChange={handleMalariaHistoryChange}value="P. knowlesi" control={<Checkbox/>} label="P. knowlesi" ></FormControlLabel>
              <FormControlLabel sx={{ml:2}} value="ไม่ทราบสปีชีส์ที่ติด" control={<Radio/>} label="ไม่ทราบสปีชีส์ที่ติด" ></FormControlLabel>

              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        <FormControl sx={{m:2}}>
            <FormLabel id="urine_amount">ปัสสาวะน้อยหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="urine_amount"
              onChange={(e) => setUrine_amount(e.target.value)}
            >
              <FormControlLabel value="ไม่มีปัสสาวะภายใน 4 ชั่วโมง" control={<Radio />} label="ไม่มีปัสสาวะภายใน 4 ชั่วโมง" />
              <FormControlLabel value="ปัสสาวะออกน้อยกว่า 400 ml/วัน" control={<Radio />} label="ปัสสาวะออกน้อยกว่า 400 ml/วัน" />
              <FormControlLabel value="ไม่มีอาการดังกล่าว" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        <FormControl sx={{m:2}}>
            <FormLabel id="urine_color">ปัสสาวะสีเข้มหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="urine_color"
              onChange={(e) => setUrine_color(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        <FormControl sx={{m:2}}>
            <FormLabel id="convulsions">มีอาการชักหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="convulsions"
              onChange={(e) => setConvulsions(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        <FormControl sx={{m:2}}>
            <FormLabel id="comatose">ผู้ป่วยไม่มีสติหรือหมดสติหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="comatose"
              onChange={(e) => setComatose(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>


        <FormControl sx={{m:2}}>
            <FormLabel id="bleeding">พบเลือดออกผิดปกติหรือไม่<dd>เช่น เหงือก จมูก อาเจียนหรือถ่ายเป็นเลือด</dd></FormLabel>
            
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="bleeding"
              onChange={(e) => setBleeding(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        
          <FormControl sx={{m:2}}>
            <FormLabel id="fatigue">มีอาการอ่อนเพลีย ไม่สามารถนั่ง เดิน หรือยืนเองได้หรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="fatigue"
              onChange={(e) => setFatigue(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        
          

        
          <FormControl sx={{m:2}}>
            <FormLabel id="asthma">พบอาการหอบหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="asthma1"
              name="asthma"
              onChange={(e) => setAsthma(e.target.value)}
            >
              <FormControlLabel checked={asthma.includes('มีการหายใจมากกว่า 30 ครั้งต่อนาที')} onChange={handleAsthmaChange}value="มีการหายใจมากกว่า 30 ครั้งต่อนาที" control={<Checkbox />} label="มีการหายใจมากกว่า 30 ครั้งต่อนาที" />
              <FormControlLabel checked={asthma.includes('มีค่า Oxygen Saturation น้อยกว่า 92%')} onChange={handleAsthmaChange}value="มีค่า Oxygen Saturation น้อยกว่า 92%" control={<Checkbox />} label="มีค่า Oxygen Saturation น้อยกว่า 92%" />
              <FormControlLabel value="ไม่มีอาการดังกล่าว" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>

          <FormControl sx={{m:2}}>
            <FormLabel id="refer">จำเป็นต้องมีการส่งต่อผู้ป่วยไปยังโรงพยาบาลอื่นหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="refer"
              onChange={(e) => setRefer(e.target.value)}
            >
              <FormControlLabel value="จำเป็น" control={<Radio />} label="จำเป็น" />
              <FormControlLabel value="ไม่จำเป็น" control={<Radio />} label="ไม่จำเป็น" />
            </RadioGroup>
          </FormControl>
          <br></br>
          <Button
              sx={{ bgcolor: "#CE3A50" }}
              type="submit"
              onClick={addPatient}
              value="save"
              variant="contained"
            >save</Button>

        
          {/* <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">พบภาวะไตวายหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="kidney1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="kidney1" control={<Radio />} label="Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L" />
              <FormControlLabel value="kidney2" control={<Radio />} label="Creatinine มากกว่า 265 µmol/L (3 mg/dL)" />
              <FormControlLabel value="kidney3" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>

        
          <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">จำนวนเชื้อมาลาเรียในเลือด</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="malariaAmount1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="malariaAmount1" control={<Checkbox />} label="มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว" />
              <FormControlLabel value="malariaAmount2" control={<Checkbox />} label="มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา" />
              <FormControlLabel value="malariaAmount3" control={<Checkbox />} label="พบเชื้อระยะแบ่งตัว" />
              <FormControlLabel value="malariaAmount4" control={<Checkbox />} label="จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10" />
              <FormControlLabel value="malariaAmount5" control={<Checkbox />} label="ไม่พบตามที่กล่าวมา" />
            </RadioGroup>
          </FormControl>
          <br></br>

        
          <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">ชนิดของเชื้อมาลาเรียที่พบ</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="malariaType1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="malariaType1" control={<Checkbox />} label="P. falciparum" />
              <FormControlLabel value="malariaType2" control={<Checkbox />} label="P. vivax" />
              <FormControlLabel value="malariaType3" control={<Checkbox />} label="P. malariae" />
              <FormControlLabel value="malariaType4" control={<Checkbox />} label="P. ovale" />
              <FormControlLabel value="malariaType5" control={<Checkbox />} label="P. knowlesi" />
              <FormControlLabel value="malariaType6" control={<Checkbox />} label="ไม่พบเชื้อ" />
              <FormControlLabel value="malariaType7" control={<Checkbox />} label="ยังไม่ทราบชนิดของเชื้อ" />
            </RadioGroup>
          </FormControl>
          <br/>

        
          <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">ระดับน้ำตาลในเลือด</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="bloodSugar1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="bloodSugar1" control={<Radio />} label="น้อยกว่า 2.2 mmol/L" />
              <FormControlLabel value="bloodSugar2" control={<Radio />} label="มากกว่า 2.2 mmol/L" />
              <FormControlLabel value="bloodSugar3" control={<Radio />} label="ไม่พบตามที่กล่าวมา" />
            </RadioGroup>
          </FormControl>
          <br></br>

        
          <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">พบภาวะเลือดเป็นกรดหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="acidosis1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="acidosis1" control={<Checkbox />} label="ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L" />
              <FormControlLabel value="acidosis2" control={<Checkbox />} label="ระดับ Bicarbonate น้อยกว่า 15 mmol/L" />
              <FormControlLabel value="acidosis3" control={<Checkbox />} label="ไม่พบตามที่กล่าวมา" />
            </RadioGroup>
          </FormControl>
          <br></br>

        
          <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">พบภาวะน้ำท่วมปอดหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="pulmonary1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="pulmonary1" control={<Radio />} label="พบ" />
              <FormControlLabel value="pulmonary2" control={<Radio />} label="ไม่พบ" />
            </RadioGroup>
          </FormControl>
        
          <br></br>
        
          <FormControl sx={{m:2}}>
            <FormLabel id="demo-radio-buttons-group-label">พบอาการตัวเหลืองตาเหลืองหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="jaundice1"
              name="radio-buttons-group"
            >
              <FormControlLabel value="jaundice1" control={<Radio />} label="พบ" />
              <FormControlLabel value="jaundice2" control={<Radio />} label="ไม่พบ" />
            </RadioGroup>
          </FormControl>
         */}

      </Grid>
      </div>

    </div>

  );
}
export default HistoryTaking;
