
import React, {useState, useEffect} from 'react';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './components/Home';
import LogIn from './components/LogIn';
import Register from './components/Register';
import HistoryTaking from './components/HistoryTaking';
import ConfirmInfo from './components/ConfirmInfo';
import UploadFilm from './components/UploadFilm';
import Result from './components/Result';
import History from './components/History';
import Profile from './components/Profile';
import AllProcess from './components/AllProcess'
import PatientScreening from './components/PatientScreening'
import DiagnosisFilm from './components/DiagnosisFilm'
import TreatmentSuggest from './components/TreatmentSuggest'
import CaseID from './components/CaseID';
import Laboratory from './components/Laboratory';
import ConfirmBloodfilm from './components/ConfirmBloodfilm';
import SuggestionResult from './components/SuggestionResult';
import SuggestionInfo from './components/SuggestionInfo';
// import { useState } from 'react';
import { async } from '@firebase/util';





function App() {
  // const [backends, setBackends] = useState([]);
  // useEffect(() => {
  //     fetch('http://127.0.0.1:8000/api/case/', {}}
  //     const backends_data = await rest.json()
  //     setBackends(backends_data)
  //   } catch(error){
  //     console.log(error)
  //   }
  // })
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/LogIn' element={<LogIn/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/HistoryTaking' element={<HistoryTaking/>} />
          <Route path='/ConfirmInfo' element={<ConfirmInfo/>} />
          <Route path='/UploadFilm' element={<UploadFilm/>} />
          <Route path='/Result' element={<Result/>} />
          <Route path='/History' element={<History/>} />
          <Route path='/Profile' element={<Profile/>} />
          <Route path='/AllProcess' element={<AllProcess/>}/>
          <Route path='/PatientScreening' element={<PatientScreening/>}/>
          <Route path='/DiagnosisFilm' element={<DiagnosisFilm/>}/>
          <Route path='/TreatmentSuggest' element={<TreatmentSuggest/>}/>
          <Route path='/CaseID' element={<CaseID/>}/>
          <Route path='/Laboratory' element={<Laboratory/>}/>
          <Route path='/ConfirmBloodfilm' element={<ConfirmBloodfilm/>}/>
          <Route path='/SuggestionResult' element={<SuggestionResult/>}/>
          <Route path='/SuggestionInfo' element={<SuggestionInfo/>}/>
        </Routes> 
      </Router>
  );
  // <div>
  //   {backends.map(item => (
  //     <div key={item.id}>
  //       <h1>{item.name}</h1>
  //       <span></span>
  //     </div>
  //   ))}
  // </div>
}



export default App;

