
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AuthService from './components/services/AuthService';
import Login from './components/Login';
import RequestLeave from './components/RequestLeave';
import ApproveLeave from './components/ApproveLeave';

const App = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/requestleave" element={<RequestLeave />} />
        <Route path="/approveleave" element={<ApproveLeave/>} />
          <Route path="/" element={<Navigate to={isAuthenticated  ? "/dashboard" : "/login"} />}></Route>
        
        </Routes>
      </Router >
    </>
  )
}

export default App;


