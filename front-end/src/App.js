import React from 'react';
import { useState } from 'react';
import './App.css';

import Header from './components/Header';

import Home from './components/Home'
import Login from './components/Login'
import DemandeAbscence from './components/DemandeAbscence'
import Abscences from './components/Abscences'
import Employees from './components/Employees'
import HistoriqueMesAbscence from './components/HistoriqueMesAbscence'

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { notify, NOTIFY_LEVEL } from './services/notify';
import { whoami, isAuthentified } from './services/auth';

function App() {
  const [loading, setLoading] = useState(false);
  const [authentified, setAuthentified] = useState(false);

  const fetchWhoami = async () => {
    try {
      const data = await whoami();
      setLoading(false);
      setAuthentified(true);
    } catch (error) {
      setLoading(false);
      notify("Erreur lors du pre-authentification!", NOTIFY_LEVEL.ERROR);
    }
  }

  return (
    <div className="App">
      {loading ? (
        <div className="text-white">
          GESTION CONGÉ IS LOADING ...
        </div>
      ) : (
        <div>
          {isAuthentified() && (
            <Header />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/demandeAbscence" element={<DemandeAbscence />} />
            <Route path="/historiqueMesAbscence" element={<HistoriqueMesAbscence />} />
            <Route path="/abscences" element={<Abscences />} />
            <Route path="/employees" element={<Employees />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
