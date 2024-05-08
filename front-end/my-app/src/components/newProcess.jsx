import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, Hidden, InputLabel, Typography } from '@mui/material';
import {TextField} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Select} from '@mui/material';
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { collection, addDoc, doc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import {Button} from "@mui/material";
import {Grid} from '@mui/material';
import { Component } from 'react';
import provinces from './province'
import { useForm, useController } from "react-hook-form";


function NewProcess() {
  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };

  console.log(selected);

  
  

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

  const [anemia, setAnemia] = useState("");
  const [kidney_failure, setKidney_failure] = useState([]);
  const [malaria_type, setMalaria_type] = useState([]);
  const [malaria_amount, setMalaria_amount] = useState([]);
  const [blood_sugar, setBlood_sugar] = useState("");
  const [acidosis, setAcidosis] = useState([],'');
  const [pulmonary_edema, setPulmonary_edema] = useState([]);
  const [jaundice, setJaundice] = useState("");


  const handleKidneyFailureChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setKidney_failure([...kidney_failure, value]);
    } else {
      setKidney_failure(kidney_failure.filter((val) => val !== value));
    }
  };

  const handleMalariaTypeChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setMalaria_type([...malaria_type, value]);
    } else {
      setMalaria_type(malaria_type.filter((val) => val !== value));
    }
  };

  const handleMalariaAmountChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setMalaria_amount([...malaria_amount, value]);
    } else {
      setMalaria_amount(malaria_amount.filter((val) => val !== value));
    }
  };

  const handleAcidosisChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setAcidosis([...acidosis, value]);
    } else {
      setAcidosis(acidosis.filter((val) => val !== value));
    }
  };

  const handlePulmonaryEdemaChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Add or remove the value from the checkedValues array
    if (isChecked) {
      setPulmonary_edema([...pulmonary_edema, value]);
    } else {
      setPulmonary_edema(pulmonary_edema.filter((val) => val !== value));
    }
  };

  const [genderChecked, setGenderChecked] = useState(false);

  const handleCheckboxGender = (event) => {
    setGenderChecked(event.target.checked);
  };

  const [travelHistoryChecked, setTravelHistoryChecked] = useState(false);

  const handleCheckboxTravelHistory = (event) => {
    setTravelHistoryChecked(event.target.checked);
  };

  const [travelAbroadHistoryChecked, setTravelAbroadHistoryChecked] = useState(false);

  const handleCheckboxTravelAbroadHistory = (event) => {
    setTravelAbroadHistoryChecked(event.target.checked);
  };
  
  const [malariaHistoryChecked, setMalariaHistoryChecked] = useState(false);

  const handleCheckboxMalariaHistory = (event) => {
    setMalariaHistoryChecked(event.target.checked);
  };
  
  const [anemiaChecked, setAnemiaChecked] = useState(false);

  const handleCheckboxAnemia = (event) => {
    setAnemiaChecked(event.target.checked);
  };
  
  const [otherDiseaseChecked, setOtherDiseaseChecked] = useState(false);

  const handleCheckboxOtherDisease = (event) => {
    setOtherDiseaseChecked(event.target.checked);
  };

  // const { validate, handleSubmit, control } = useForm({
  //   defaultValues: {
  //     controlled: [],
  //     uncontrolled: []
  //   }
  // });
  // const { validate, handleSubmit } = useForm();
  // const checkForm = useController()
  
  // const generateDocumentId = () => {
    //   const min = Math.ceil(Number.MIN_VALUE);
    //   const max = Math.ceil(Number.MAX_VALUE);
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // };
    
    const addPatient = async (e) => {
      e.preventDefault();
      // const docId = generateDocumentId();
      const timestamp = Date.now().toString(); 
      // const timestamp = Timestamp.toDate(); 
      const customDocId = `MD-${timestamp}`; 
      // const customDocId = `${generateDocumentId}`
      //collection(db,"patient"),
      try {
        // const docRef = collection(db,"patient").doc(docId);
        const docRef = await setDoc(doc(db,"patient", customDocId),
        // await docRef.set(
          {
            age: Number(age),
            gender:gender,
            weight: Number(weight),
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
          anemia: anemia,
          kidney_failure:kidney_failure,
          malaria_type:malaria_type,
          malaria_amount:malaria_amount,
          blood_sugar:blood_sugar,
          acidosis:acidosis,
          pulmonary_edema:pulmonary_edema,
          jaundice:jaundice,
          
        })
        console.log("Document written with ID:", customDocId);
        alert("บันทึกข้อมูลเสร็จสิ้นโปรดกดปุ่มเสร็จสิ้นที่มุมขวาล่าง")
    } catch(e){
      console.error("Error adding document",e);
        alert("โปรดกรอกข้อมูลให้ครบทุกข้อ")
      }
    };
    
    // const [isFormComplete, setIsFormComplete] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isFormComplete, setIsFormComplete] = React.useState(false);
    const onSubmit = (data) => {
      // alert(console.log(data));
      if (checkFormCompletion()) {
        // do something with the data
        console.log("Form submitted successfully");
      } else {
        console.log("Please complete all required fields");
      }
    }
    const checkFormCompletion = () => {
  //     let error = []
  //     if (age !== ''){
  //       setIsFormComplete(true);
  // } else {
  //   setIsFormComplete(false);
  
  //     }
  if (
    age !== "" &&
      gender !== '' && 
      weight !== '' && 
      temperature !== '' && 
      underlying_disease !== '' && 
      province !== '' && 
      travel_history !== '' && 
      drug_allergy !== '' && 
      taking_medicine.length > 0 && 
      malaria_history !== '' &&
      urine_amount !== '' && 
      urine_color !== '' && 
      convulsions !== '' && 
      comatose !== '' && 
      bleeding !== '' && 
      fatigue !== '' && 
      asthma !== '' && 
      refer !== '' && 
      anemia !== '' && 
      kidney_failure !== '' && 
      malaria_type !== '' && 
      malaria_amount !== '' && 
      blood_sugar !== '' && 
      acidosis !== '' && 
      pulmonary_edema !== "" &&
      jaundice !== ""
    //   (
    //     pulmonary_edema !== '' && 
    //     jaundice !== '' && 
    //   || !malariaHistoryChecked)) 
    //   {
    //     setIsFormComplete(true);
    //   } else {
    //     setIsFormComplete(false);
    //   }
    //   setIsFormComplete({...error})
    //   return false;
    // }
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  useEffect(() => {
    checkFormCompletion();
  }, [    age,    gender,    weight,    temperature,    underlying_disease,    province,    travel_history,    drug_allergy,    taking_medicine,    malaria_history,    urine_amount,    urine_color,    convulsions,    comatose,    bleeding,    fatigue,    asthma,    refer,    anemia,    kidney_failure,    malaria_type,    malaria_amount,    blood_sugar,    acidosis,    pulmonary_edema,    jaundice,  ]);



    
    
    
  return (
    
    <div className='App'>
      
      <h2 className="App-result">กรอกข้อมูลของผู้ป่วย</h2>
      {/* <TextField
        required
        defaultValue="Case ID" 
        id="case_id"
        InputProps={{readOnly: true}}
        sx={{m:4}}/> */}
      

      
      <div className='App-info'>
        <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
          container
          sx={{ borderRadius: 2,p:6 }}
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
        <Typography sx={{color:"#5B2F21",justifyContent:"center",fontSize:30,fontWeight: 600 }}>ข้อมูลการซักประวัติ</Typography>
        <FormControl  sx={{m:2}}  >
          <FormLabel sx={{color:'black'}} id="age">อายุ<dd>หากอายุไม่ถึง 1 ปีให้ระบุเป็นเลขทศนิยม เช่น อายุ 5 เดือนโปรดระบุว่า อายุ 0.5 ปี</dd></FormLabel>
          <TextField {...register("age",{ required: true, min: 0})}   sx={{bgcolor:"white"}} type="number" name="age" InputLabelProps={{
            shrink: true,
          }} onChange={(e) => setAge(e.target.value)}
          
          ></TextField>
          {errors.age && <span>This field is required and must be greater than or equal to 0</span>}
        </FormControl>
        <br></br>
        

        <FormControl required sx={{m:2}}>
          <FormLabel sx={{color:'black'}} id="gender">เพศ</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              name="gender"
              {...register("gender", { required: true })}
              onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel sx={{color:'black'}} value="ชาย" control={<Radio/>} label="ชาย"></FormControlLabel>
                <FormControlLabel sx={{color:'black'}} value="หญิง"  control={<Radio/>} id="female" label="หญิง"
                checked={genderChecked}
                onChange={handleCheckboxGender}>
                {/* <div aria-hidden={selected!=="female"?true:false}>

                </div> */}
                </FormControlLabel>
                {genderChecked && (
                  <div>
                <FormControlLabel sx={{ml:2, color:'black'}} value="กำลังตั้งครรภ์หรือมีแผนในการมีลูก" control={<Radio/>} label="กำลังตั้งครรภ์ หรือมีแผนในการมีลูก" ></FormControlLabel>
                <FormControlLabel sx={{ml:2, color:'black'}} value="ไม่ได้กำลังตั้งครรภ์แต่มีแผนในการมีลูก" control={<Radio/>} label=" ไม่ได้กำลังตั้งครรภ์แต่มีแผนในการมีลูก"></FormControlLabel>
                <FormControlLabel sx={{ml:2, color:'black'}} value="กำลังให้นมบุตร" control={<Radio/>} label="กำลังให้นมบุตร"></FormControlLabel>
                </div>)}
            </RadioGroup>
            

           
                
                {/* <FormControlLabel value="gender5" control={<Radio/>} label="อื่น ๆ"></FormControlLabel> */}
        </FormControl>
        <br></br>

        <FormControl required sx={{m:2}}>
          <FormLabel sx={{color:'black'}} id="weight">น้ำหนัก</FormLabel>
          <TextField {...register("weight", { required: true, min:0 })} required sx={{bgcolor:"white"}} type="number" name="weight" InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setWeight(e.target.value)}></TextField>
        </FormControl>
        <br></br>

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="temperature">อุณหภูมิร่างกาย</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="temperature"
              {...register("temperature", { required: true })}
              onChange={(e) => setTemperature(e.target.value)}
            >
              <FormControlLabel sx={{color:'black'}} value="มากกว่า 39 องศา" control={<Radio />} label="มากกว่า 39 องศา" />
              <FormControlLabel sx={{color:'black'}} value="น้อยกว่า 39 องศา" control={<Radio />} label="น้อยกว่า 39 องศา" />
            </RadioGroup>
          </FormControl>
          <br></br>
        

        <FormControl required sx={{m:2}}>
          <FormLabel sx={{color:'black'}} id="underlying_disease">มีโรคประจำตัวหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              name="underlying_disease"
              {...register("underlying_disease", { required: true })}
              onChange={(e) => setUnderlying_disease(e.target.value)}>
                <FormControlLabel value="0" control={<Radio/>} label="ไม่มี"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('ภาวะพร่องเอ็นไซม์ G6PD')} onChange={handleCheckboxChange}value="ภาวะพร่องเอ็นไซม์ G6PD" control={<Checkbox/>} label="ภาวะพร่องเอ็นไซม์ G6PD"></FormControlLabel>
                {/* <FormControlLabel checked={underlying_disease.includes('จี-6-พีดี')} onChange={handleCheckboxChange}value="จี-6-พีดี" control={<Checkbox/>} label="จี-6-พีดี "></FormControlLabel> */}
                <FormControlLabel checked={underlying_disease.includes('โรคอ้วน')} onChange={handleCheckboxChange}value="โรคอ้วน" control={<Checkbox/>} label="โรคอ้วน"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคตับ')} onChange={handleCheckboxChange}value="โรคตับ" control={<Checkbox/>} label="โรคตับ"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคไต')} onChange={handleCheckboxChange}value="โรคไต" control={<Checkbox/>} label="โรคไต"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคเบาหวาน')} onChange={handleCheckboxChange}value="โรคเบาหวาน" control={<Checkbox/>} label="โรคเบาหวาน"></FormControlLabel>
                <FormControlLabel checked={underlying_disease.includes('โรคความดันโลหิตสูง')} onChange={handleCheckboxChange}value="โรคความดันโลหิตสูง" control={<Checkbox/>} label="โรคความดันโลหิตสูง"></FormControlLabel>
                
                
                <FormControlLabel checked={underlying_disease.includes('อื่น ๆ')} onChange={handleCheckboxChange}value="อื่น ๆ" control={<Checkbox/>} label="อื่น ๆ"
                checked={otherDiseaseChecked}
                onChange={handleCheckboxOtherDisease}></FormControlLabel>
                {otherDiseaseChecked && (
        <div>
                <TextField sx={{ml:4, bgcolor:"white"}} label="โปรดระบุ" variant='outlined'
                onChange={(e) => setUnderlying_disease(e.target.value)}></TextField>
                </div>
                )}
                </RadioGroup>
        </FormControl>
        <br></br>
        

        <FormControl required sx={{m:2,minWidth:300}}>
          <FormLabel sx={{color:'black'}} id="province">คุณอาศัยอยู่ในจังหวัดอะไร</FormLabel>
          <Select 
            labelId='demo-simple-select-label'
            id='province'
            value={province}
            {...register("province", { required: true })}
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

          
        </FormControl>
        <br/>
        


        

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="travel_history">มีประวัติการเดินทางไปยังพื้นที่เสี่ยงอย่างน้อย  1 เดือนที่ผ่านมาหรือไม่</FormLabel>
            <dd>พื้นที่เสี่ยงมาลาเรีย ได้แก่ ตาก กาญจนบุรี ราชบุรี แม่ฮ่องสอน ยะลา ศรีสะเกษ ประจวบคีรีขันธ์ ชุมพร เพชรบุรี ระนอง สงขลา อุบลราชธานี</dd>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="travel_history"
              {...register("travel_history", { required: true })}
              onChange={(e) => setTravel_history(e.target.value)}
            >
              {/* <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" 
               checked={isChecked}
               onChange={handleCheckbox}/>

{isChecked && (
        <div> */}

              <FormControlLabel  checked={travel_history.includes('ในประเทศไทย')} onChange={handleTravelHistoryChange}value="ในประเทศไทย" control={<Checkbox/>} label="ในประเทศไทย" 
              checked={travelHistoryChecked}
              onChange={handleCheckboxTravelHistory}
              ></FormControlLabel>
              {travelHistoryChecked && (
        <div>

          <FormControlLabel checked={travel_history.includes('ตาก')} onChange={handleTravelHistoryChange}value="ตาก" control={<Checkbox/>} label="ตาก" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('กาญจนบุรี')} onChange={handleTravelHistoryChange}value="กาญจนบุรี" control={<Checkbox/>} label="กาญจนบุรี" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ตราด')} onChange={handleTravelHistoryChange}value="ตราด" control={<Checkbox/>} label="ตราด" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ราชบุรี')} onChange={handleTravelHistoryChange}value="ราชบุรี" control={<Checkbox/>} label="ราชบุรี" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('แม่ฮ่องสอน')} onChange={handleTravelHistoryChange}value="แม่ฮ่องสอน" control={<Checkbox/>} label="แม่ฮ่องสอน" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ยะลา')} onChange={handleTravelHistoryChange}value="ยะลา" control={<Checkbox/>} label="ยะลา" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ศรีสะเกษ')} onChange={handleTravelHistoryChange}value="ศรีสะเกษ" control={<Checkbox/>} label="ศรีสะเกษ" ></FormControlLabel>
          <FormControlLabel checked={travel_history.includes('จันทบุรี')} onChange={handleTravelHistoryChange}value="จันทบุรี" control={<Checkbox/>} label="จันทบุรี" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ประจวบคีรีขันธ์')} onChange={handleTravelHistoryChange}value="ประจวบคีรีขันธ์" control={<Checkbox/>} label="ประจวบคีรีขันธ์" ></FormControlLabel>
</div>
      )}

              <FormControlLabel  checked={travel_history.includes('ต่างประเทศ')} onChange={handleTravelHistoryChange}value="ต่างประเทศ" control={<Checkbox/>} label="ต่างประเทศ" 
              checked={travelAbroadHistoryChecked}
              onChange={handleCheckboxTravelAbroadHistory}
              ></FormControlLabel>
              {travelAbroadHistoryChecked && (
        <div>


          <FormControlLabel  checked={travel_history.includes('ประเทศแถบแอฟริกา')} onChange={handleTravelHistoryChange}value="ประเทศแถบแอฟริกา" control={<Checkbox/>} label="ประเทศแถบแอฟริกา" ></FormControlLabel>
          <FormControlLabel checked={travel_history.includes('ประเทศแถบหมู่เกาะแปซิฟิกตอนใต้')} onChange={handleTravelHistoryChange}value="ประเทศแถบหมู่เกาะแปซิฟิกตอนใต้" control={<Checkbox/>} label="ประเทศแถบหมู่เกาะแปซิฟิกตอนใต้" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ปาปัวนิวกินี')} onChange={handleTravelHistoryChange}value="ปาปัวนิวกินี" control={<Checkbox/>} label="ปาปัวนิวกินี" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('เมียนมาร์')} onChange={handleTravelHistoryChange}value="เมียนมาร์" control={<Checkbox/>} label="เมียนมาร์" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('ลาว')} onChange={handleTravelHistoryChange}value="ลาว" control={<Checkbox/>} label="ลาว" ></FormControlLabel>
          <FormControlLabel checked={travel_history.includes('กัมพูชา')} onChange={handleTravelHistoryChange}value="กัมพูชา" control={<Checkbox/>} label="กัมพูชา" ></FormControlLabel>
          <FormControlLabel  checked={travel_history.includes('มาเลเซีย')} onChange={handleTravelHistoryChange}value="มาเลเซีย" control={<Checkbox/>} label="มาเลเซีย" ></FormControlLabel>
</div>
      )}
              {/* </div>
      )}
               */}



              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

      

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="drug_allergy">มีประวัติการแพ้ยาต้านมาลาเรียหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="drug_allergy"
              {...register("drug_allergy", { required: true })}
              onChange={(e) => setDrug_allergy(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

          <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="taking_medicine">อาการหลังจากรับประทานยาเม็ดของผู้ป่วย</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="taking_medicine"
              {...register("taking_medicine", { required: true })}
              onChange={(e) => setTaking_medicine(e.target.value)}
            >
              <FormControlLabel checked={taking_medicine.includes('รับประทานยาแล้วอาเจียน')} onChange={handleTakingMedicineChange}value="รับประทานยาแล้วอาเจียน" control={<Checkbox />} label="รับประทานยาแล้วอาเจียน" />
              <FormControlLabel checked={taking_medicine.includes('รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง')} onChange={handleTakingMedicineChange}value="รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" control={<Checkbox />} label="รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" />
              <FormControlLabel checked={taking_medicine.includes('ไม่สามารถรับประทานยาเม็ดได้')} onChange={handleTakingMedicineChange}value="ไม่สามารถรับประทานยาเม็ดได้" control={<Checkbox />} label="ไม่สามารถรับประทานยาเม็ดได้" />
              <FormControlLabel value="ไม่มีอาการดังกล่าว" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>


        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="malaria_history">ประวัติการติดเชื้อมาลาเรียในช่วง 1 ปีที่ผ่านมา และโปรดระบุสปีชีส์ที่ติด</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="malaria_history"
              {...register("malaria_history", { required: true })}
              onChange={(e) => setMalaria_history(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" 
              checked={malariaHistoryChecked}
              onChange={handleCheckboxMalariaHistory}/>
{malariaHistoryChecked && (
        <div>
              <FormControlLabel sx={{ml:2, fontStyle: 'italic'}}  checked={malaria_history.includes('P. falciparum')} onChange={handleMalariaHistoryChange}value="P. falciparum" control={<Checkbox/>} label="P. falciparum" ></FormControlLabel>
              <FormControlLabel sx={{ml:2, fontStyle: 'italic'}} checked={malaria_history.includes('P. vivax')} onChange={handleMalariaHistoryChange}value="P. vivax" control={<Checkbox/>} label="P. vivax" ></FormControlLabel>
              <FormControlLabel sx={{ml:2, fontStyle: 'italic'}} checked={malaria_history.includes('P. malariae')} onChange={handleMalariaHistoryChange}value="P. malariae" control={<Checkbox/>} label="P. malariae" ></FormControlLabel>
              <FormControlLabel sx={{ml:2, fontStyle: 'italic'}} checked={malaria_history.includes('P. ovale')} onChange={handleMalariaHistoryChange}value="P. ovale" control={<Checkbox/>} label="P. ovale" ></FormControlLabel>
              <FormControlLabel sx={{ml:2, fontStyle: 'italic'}} checked={malaria_history.includes('P. knowlesi')} onChange={handleMalariaHistoryChange}value="P. knowlesi" control={<Checkbox/>} label="P. knowlesi" ></FormControlLabel>
              <FormControlLabel sx={{ml:2}} value="ไม่ทราบสปีชีส์ที่ติด" control={<Radio/>} label="ไม่ทราบสปีชีส์ที่ติด" ></FormControlLabel>
              </div>
      )}
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="urine_amount">ปัสสาวะน้อยหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="urine_amount"
              {...register("urine_amount", { required: true })}
              onChange={(e) => setUrine_amount(e.target.value)}
            >
              <FormControlLabel value="ไม่มีปัสสาวะภายใน 4 ชั่วโมง" control={<Radio />} label="ไม่มีปัสสาวะภายใน 4 ชั่วโมง" />
              <FormControlLabel value="ปัสสาวะออกน้อยกว่า 400 ml/วัน" control={<Radio />} label="ปัสสาวะออกน้อยกว่า 400 ml/วัน" />
              <FormControlLabel value="ไม่มีอาการดังกล่าว" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="urine_color">ปัสสาวะสีเข้มหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="urine_color"
              {...register("urine_color", { required: true })}
              onChange={(e) => setUrine_color(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="convulsions">มีอาการชักหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="convulsions"
              {...register("convulsions", { required: true })}
              onChange={(e) => setConvulsions(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="comatose">ผู้ป่วยไม่มีสติหรือหมดสติหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="comatose"
              {...register("comatose", { required: true })}
              onChange={(e) => setComatose(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>


        <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="bleeding">พบเลือดออกผิดปกติหรือไม่<dd>เช่น เหงือก จมูก อาเจียนหรือถ่ายเป็นเลือด</dd></FormLabel>
            
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="bleeding"
              {...register("bleeding", { required: true })}
              onChange={(e) => setBleeding(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        

        
          <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="fatigue">มีอาการอ่อนเพลีย ไม่สามารถนั่ง เดิน หรือยืนเองได้หรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="fatigue"
              {...register("fatigue", { required: true })}
              onChange={(e) => setFatigue(e.target.value)}
            >
              <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />
              <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
            </RadioGroup>
          </FormControl>
          <br></br>

        
          

        
          <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="asthma">พบอาการหอบหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="asthma1"
              name="asthma"
              {...register("asthma", { required: true })}
              onChange={(e) => setAsthma(e.target.value)}
            >
              <FormControlLabel checked={asthma.includes('มีการหายใจมากกว่า 30 ครั้งต่อนาที')} onChange={handleAsthmaChange}value="มีการหายใจมากกว่า 30 ครั้งต่อนาที" control={<Checkbox />} label="มีการหายใจมากกว่า 30 ครั้งต่อนาที" />
              <FormControlLabel checked={asthma.includes('มีค่า Oxygen Saturation น้อยกว่า 92%')} onChange={handleAsthmaChange}value="มีค่า Oxygen Saturation น้อยกว่า 92%" control={<Checkbox />} label="มีค่า Oxygen Saturation น้อยกว่า 92%" />
              <FormControlLabel value="ไม่มีอาการดังกล่าว" control={<Radio />} label="ไม่มีอาการดังกล่าว" />
            </RadioGroup>
          </FormControl>
          <br></br>

          <FormControl required sx={{m:2}}>
            <FormLabel sx={{color:'black'}} id="refer">จำเป็นต้องมีการส่งต่อผู้ป่วยไปยังโรงพยาบาลอื่นหรือไม่</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="refer"
              {...register("refer", { required: true })}
              onChange={(e) => setRefer(e.target.value)}
            >
              <FormControlLabel value="จำเป็น" control={<Radio />} label="จำเป็น" />
              <FormControlLabel value="ไม่จำเป็น" control={<Radio />} label="ไม่จำเป็น" />
            </RadioGroup>
          </FormControl>
          <br></br>
          

        
     
            </Grid>
            <Grid container
          sx={{ borderRadius: 2,p:6,mt:6}}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500">
            <Typography sx={{color:"#5B2F21",justifyContent:"center",fontSize:30,fontWeight: 600}}>ผลตรวจทางห้องปฏิบัติการ</Typography>
         
         
         <FormControl required sx={{ m: 2, position: "center" }}>
          <FormLabel sx={{color:'black'}} id="anemia">พบภาวะซีดหรือไม่</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="yes"
            name="anemia"
            {...register("anemia", { required: true })}
            onChange={(e) => setAnemia(e.target.value)} 
          >
            <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" 
            checked={anemiaChecked}
            onChange={handleCheckboxAnemia}/>
{anemiaChecked && (
        <div>
            <FormControlLabel
              sx={{ ml: 2 }}
              value="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 5 g/dL หรือ ระดับฮีมาโตคริตน้อยกว่าหรือเท่ากับ 15%"
              control={<Radio />}
              label="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 5 g/dL หรือ ระดับฮีมาโตคริตน้อยกว่าหรือเท่ากับ 15%"
            ></FormControlLabel>
            <FormControlLabel
              sx={{ ml: 2 }}
              value="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 7 g/dL หรือระดับฮีมาโตคริตน้อยกว่า 20% ร่วมกับจำนวนเชื้อมาลาเรียในเลือดมากกว่า 100,000/ µl"
              control={<Radio />}
              label="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 7 g/dL หรือระดับฮีมาโตคริตน้อยกว่า 20% ร่วมกับจำนวนเชื้อมาลาเรียในเลือดมากกว่า 100,000/ µl"
            ></FormControlLabel>
            </div>
      )}
            <FormControlLabel value="0" control={<Radio />} label="ไม่ใช่" />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="kidney_failure">
            พบภาวะไตวายหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="kidney1"
            name="kidney_failure"
            {...register("kidney_failure", { required: true })}
            onChange={(e) => setKidney_failure(e.target.value)}
          >
            <FormControlLabel
            checked={kidney_failure.includes('มีค่า Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L')} onChange={handleKidneyFailureChange}
              value="มีค่า Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L"
              control={<Checkbox />}
              label="มีค่า Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L"
            />
            <FormControlLabel
            checked={kidney_failure.includes('มีค่า Creatinine มากกว่า 265 µmol/L (3 mg/dL)')} onChange={handleKidneyFailureChange}
              value="มีค่า Creatinine มากกว่า 265 µmol/L (3 mg/dL)"
              control={<Checkbox />}
              label="มีค่า Creatinine มากกว่า 265 µmol/L (3 mg/dL)"
            />
            <FormControlLabel
              value="ไม่มีอาการดังกล่าว"
              control={<Radio />}
              label="ไม่มีอาการดังกล่าว"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="malaria_type">
            ชนิดของเชื้อมาลาเรียที่ตรวจพบ ณ ปัจจุบัน
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="malaria_type1"
            name="malaria_type"
            {...register("malaria_type", { required: true })}
            onChange={(e) => setMalaria_type(e.target.value)}
          >
            <FormControlLabel sx={{fontStyle: 'italic'}}
            checked={malaria_type.includes('P. falciparum')} onChange={handleMalariaTypeChange}
              value="P. falciparum"
              control={<Checkbox />}
              label="P. falciparum"
            />
            <FormControlLabel sx={{fontStyle: 'italic'}}
            checked={malaria_type.includes('P. vivax')} onChange={handleMalariaTypeChange}
              value="P. vivax"
              control={<Checkbox />}
              label="P. vivax"
            />
            <FormControlLabel sx={{fontStyle: 'italic'}}
            checked={malaria_type.includes('P. malariae')} onChange={handleMalariaTypeChange}
              value="P. malariae"
              control={<Checkbox />}
              label="P. malariae"
            />
            <FormControlLabel sx={{fontStyle: 'italic'}}
            checked={malaria_type.includes('P. ovale')} onChange={handleMalariaTypeChange}
              value="P. ovale"
              control={<Checkbox />}
              label="P. ovale"
            />
            <FormControlLabel sx={{fontStyle: 'italic'}}
            checked={malaria_type.includes('P. knowlesi')} onChange={handleMalariaTypeChange}
              value="P. knowlesi"
              control={<Checkbox />}
              label="P. knowlesi"
            />
            <FormControlLabel
              value="ไม่พบเชื้อ"
              control={<Radio />}
              label="ไม่พบเชื้อ"
            />
            <FormControlLabel
              value="ยังไม่ทราบชนิดของเชื้อ"
              control={<Radio />}
              label="ยังไม่ทราบชนิดของเชื้อ"
            />
          </RadioGroup>
        </FormControl>
        <br />

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="malaria_amount">
            จำนวนเชื้อมาลาเรียที่ตรวจพบในเลือด
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="malariaAmount1"
            name="malaria_amount"
            {...register("malaria_amount", { required: true })}
            onChange={(e) => setMalaria_amount(e.target.value)}
          >
            <FormControlLabel
            checked={malaria_amount.includes('มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว')} onChange={handleMalariaAmountChange}
              value="มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว"
              control={<Checkbox />}
              label="มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว"
            />
            <FormControlLabel
            checked={malaria_amount.includes('มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา')} onChange={handleMalariaAmountChange}
              value="มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา"
              control={<Checkbox />}
              label="มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา"
            />
            <FormControlLabel
            checked={malaria_amount.includes('พบเชื้อระยะแบ่งตัว')} onChange={handleMalariaAmountChange}
              value="พบเชื้อระยะแบ่งตัว"
              control={<Checkbox />}
              label="พบเชื้อระยะแบ่งตัว"
            />
            <FormControlLabel
            checked={malaria_amount.includes('จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10')} onChange={handleMalariaAmountChange}
              value="จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10"
              control={<Checkbox />}
              label="จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10"
            />
            <FormControlLabel
              value="ไม่พบตามที่กล่าวมา"
              control={<Radio />}
              label="ไม่พบตามที่กล่าวมา"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="blood_sugar">
            ระดับน้ำตาลในเลือด
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="bloodSugar1"
            name="blood_sugar"
            {...register("blood_sugar", { required: true })}
            onChange={(e) => setBlood_sugar(e.target.value)}
          >
            <FormControlLabel
              value="น้อยกว่า 2.2 mmol/L"
              control={<Radio />}
              label="น้อยกว่า 2.2 mmol/L"
            />
            <FormControlLabel
              value="มากกว่า 2.2 mmol/L"
              control={<Radio />}
              label="มากกว่า 2.2 mmol/L"
            />
            <FormControlLabel
              value="ไม่พบตามที่กล่าวมา"
              control={<Radio />}
              label="ไม่พบตามที่กล่าวมา"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="acidosis">
            พบภาวะเลือดเป็นกรดหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="acidosis"
            name="acidosis"
            {...register("acidosis", { required: true })}
            onChange={(e) => setAcidosis(e.target.value)}
          >
            <FormControlLabel
            checked={acidosis.includes('ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L')} onChange={handleAcidosisChange}
              value="ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L"
              control={<Checkbox />}
              label="ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L"
            />
            <FormControlLabel
            checked={acidosis.includes('ระดับ Bicarbonate น้อยกว่า 15 mmol/L')} onChange={handleAcidosisChange}
              value="ระดับ Bicarbonate น้อยกว่า 15 mmol/L"
              control={<Checkbox />}
              label="ระดับ Bicarbonate น้อยกว่า 15 mmol/L"
            />
            <FormControlLabel
              value="ไม่พบตามที่กล่าวมา"
              control={<Radio />}
              label="ไม่พบตามที่กล่าวมา"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="pulmonary_edema">
            พบภาวะน้ำท่วมปอดหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="pulmonary_edema1"
            name="pulmonary_edema"
            {...register("pulmonary_edema", { required: true })}
            onChange={(e) => setPulmonary_edema(e.target.value)}
          >
            <FormControlLabel
              value="พบ"
              control={<Radio />}
              label="พบ"
            />

            <FormControlLabel
              sx={{ ml: 2 }}
              checked={pulmonary_edema.includes('จากการฟัง')} onChange={handlePulmonaryEdemaChange}
              value="จากการฟัง"
              control={<Checkbox />}
              label="จากการฟัง"
            ></FormControlLabel>
            <FormControlLabel
              sx={{ ml: 2 }}
              checked={pulmonary_edema.includes('จากการ X-Ray')} onChange={handlePulmonaryEdemaChange}
              value="จากการ X-Ray"
              control={<Checkbox />}
              label="จากการ X-Ray"
            ></FormControlLabel>

            <FormControlLabel
              value="ไม่พบ"
              control={<Radio />}
              label="ไม่พบ"
            />
          </RadioGroup>
        </FormControl>

        <br></br>

        <FormControl required sx={{ m: 2 }}>
          <FormLabel sx={{color:'black'}} id="jaundice">
            พบอาการตัวเหลืองตาเหลืองหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="jaundice1"
            name="jaundice"
            {...register("jaundice", { required: true })}
            onChange={(e) => setJaundice(e.target.value)}
          >
            <FormControlLabel
              value="พบ Bilirubin มากกว่า 3 mg/dL"
              control={<Radio />}
              label="พบ Bilirubin มากกว่า 3 mg/dL"
            />

            {/* <FormControlLabel
              sx={{ ml: 2 }}
              value="Bilirubin มากกว่า 3 mg/dL"
              control={<Radio />}
              label="Bilirubin มากกว่า 3 mg/dL"
            ></FormControlLabel> */}

            <FormControlLabel
              value="ไม่พบ"
              control={<Radio />}
              label="ไม่พบ"
            />
          </RadioGroup>
        </FormControl><br/>
        </Grid>
      <Button
              sx={{ bgcolor: "#CE3A50" , mt:4}}
              type="submit"
              onClick={addPatient}
              // onClick={() => {
              //   addPatient();
              //   handleSubmit();
              // }}
              value="save"
              variant="contained"
              disabled={!isFormComplete}
              // disabled={!isFormComplete}
              >save</Button>
              </form>
      </div>

    </div>

  );
}
export default NewProcess;
