import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './pages/Header'
import Dashboard from './pages/Dashboard'
import Setting from './pages/Setting'
import AddTask from './pages/AddTask';
import { AlertProvider } from "./contexts/alertProvider"; 

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </AlertProvider>
    </BrowserRouter>
  )
}

export default App
