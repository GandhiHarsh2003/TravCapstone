import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";
import Home from './components/Home';
import Employee from './components/Employee';
import Button from "@mui/material/Button";
import SearchResults from './components/SearchResults';
import SalaryEstimate from './components/SalaryEstimate';
import logo from './assets/Travelers Logo.png';

function App() {

  return (
    <Router>
      <header className="header">
              <Link className='link logo' to="/"><img className='header-logo' src={logo} alt="TRAVELERS"/></Link>
            <nav className="pages">
                <Link className='link link-nav' to="/Login">Login</Link>
                <Link className='link link-nav' to="/Salary_Estimate">Salary Estimate</Link>
                <Link className='link link-nav' to="/Employee">Profile</Link>
            </nav>
        </header>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/Employee" element={<Employee/>} />
        <Route path="/SearchResults" element={<SearchResults/>} />
        <Route path="/Salary_Estimate" element={<SalaryEstimate />} />
      </Routes>
      <footer>
        &copy; 2049 The Travelers Indemnity Company. All rights reserved.
      </footer>
    </Router>
  )
}

export default App
