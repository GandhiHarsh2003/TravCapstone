import { useEffect, useState } from 'react'
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
import SearchResults from './components/SearchResults';
import SalaryEstimate from './components/SalaryEstimate';
import logo from './assets/Travelers Logo.png';
import Login from './components/Login';
import './Home.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    console.log('Removing user data from localStorage');
    localStorage.removeItem('user');
    setUser(null);
    console.log('User logged out successfully');
  };

  return (
    <Router>
      <header className="header">
        <Link className='link logo' to="/"><img className='header-logo' src={logo} alt="TRAVELERS" /></Link>
        <nav className="pages">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username.split('.')[0].charAt(0).toUpperCase() + user.username.split('.')[0].slice(1)}</span>
              <Link className='link link-nav' to="/Salary_Estimate">Salary Estimate</Link>
              <Link className='link link-nav' to="/Employee">Profile</Link>
              <button
                className='link link-nav'
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className='link link-nav' to="/Login">Login</Link>
          )}
        </nav>

      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path="/Salary_Estimate" element={<SalaryEstimate />} />
      </Routes>
      <footer>
        &copy; 2049 The Travelers Indemnity Company. All rights reserved.
      </footer>
    </Router>
  )
}

export default App
