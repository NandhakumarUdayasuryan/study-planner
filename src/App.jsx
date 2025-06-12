import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './pages/Header'
import Dashboard from './pages/Dashboard'
import Setting from './pages/Setting'
import AddTask from './pages/AddTask';
import CustomAlert from './components/customAlert';
function App() {
  // Define alertMessage, you can set it to an empty string or any default message
  const [alertMessage, setAlertMessage] = useState('');
  // You can set the alertMessage based on some condition or event
  useEffect(() => {
    // Example: Set an alert message after 3 seconds
    const timer = setTimeout(() => {
      setAlertMessage('');
    }, 3000);
    setAlertMessage('Welcome to the Task Manager! You can add, view, and manage your tasks here.');
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <BrowserRouter>
      <CustomAlert message={alertMessage}/>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
