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
import DirectReports from './components/DirectReports';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('user');
      console.log('Checking localStorage for user data:', loggedInUser);
      
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        console.log('Parsed user data:', parsedUser);
        setUser(parsedUser);
      } else {
        console.log('No user data found in localStorage');
      }
      
    } catch (error) {
      console.error('Error retrieving user data from localStorage:', error);
    }
    
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        console.log('Storage event detected for user:', e.newValue);
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    console.log('Removing user data from localStorage');
    localStorage.removeItem('user');
    setUser(null);
    console.log('User logged out successfully');
    navigate('/Login'); 
  };

  return (
    <>
      <header className="header">
        <Link className='link logo' to="/"><img className='header-logo' src={logo} alt="TRAVELERS" /></Link>
        <nav className="pages">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username.split('.')[0].charAt(0).toUpperCase() 
              + user.username.split('.')[0].slice(1, -1) + " " + user.username.split('.')[0].slice(-1).toUpperCase()}</span>
              <Link className='link link-nav' to="/">Home</Link>
              <Link className='link link-nav' to="/Employee">My Profile</Link>
              <Link className='link link-nav' to="/DirectReports">My Direct Reports</Link>
              <Link className='link link-nav' to="/Salary_Estimate">Salary Estimate</Link>
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
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/Login" />} />
        <Route path="/Login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/Employee" element={user ? <Employee /> : <Navigate to="/Login" />} />
        <Route path="/SearchResults" element={user ? <SearchResults /> : <Navigate to="/Login" />} />
        <Route path="/Salary_Estimate" element={user ? <SalaryEstimate /> : <Navigate to="/Login" />} />
        <Route path="/DirectReports" element={user ? <DirectReports /> : <Navigate to="/Login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
