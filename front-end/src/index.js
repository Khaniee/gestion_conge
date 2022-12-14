import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


import Login from './components/Login'
import HistoriqueAbscence from './components/HistoriqueAbscence'
import DemandeAbscence from './components/DemandeAbscence'
import ValidationAbscence from './components/ValidationAbscence'
import Employees from './components/Employees'
import HistoriqueMesAbscence from './components/HistoriqueMesAbscence'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/demandeAbscence" element={<DemandeAbscence/>}/>
  <Route path="/historiqueAbscence" element={<HistoriqueAbscence/>}/>
  <Route path="/historiqueMesAbscence" element={<HistoriqueMesAbscence/>}/>
  <Route path="/validationDemande" element={<ValidationAbscence/>}/>
  <Route path="/employees" element={<Employees/>}/> 
</Routes>
</BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register(); 
//npx create react app nom --template pwa pour enregistrer tout meme sans conexion

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
