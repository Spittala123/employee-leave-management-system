import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './services/AuthService';

interface Data {
  Username: string;
  Password: string;
  Roles: string[];
}

const Login: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  //const [Role[],setRole]=useState("")
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requestData: Data = {
      Username: Username,
      Password: Password,
      Roles: []
    };

    try {
      const response = await fetch('http://localhost:5224/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
//user.roles[0]
      if (response.ok) {
        const jsonResponse = await response.json();
        setData(jsonResponse);
        localStorage.setItem("token",jsonResponse.token);
        localStorage.setItem("username",jsonResponse.userdetails.username)
        localStorage.setItem('Role', jsonResponse.userdetails.role)
        localStorage.setItem("employeeid",jsonResponse.userdetails.employeeID)
          navigate("/dashboard", { replace: true });
      } else {
        console.error('Error in response:', response.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='container mt-5'>
                <h2>Login</h2>
                {error && <p className='text-danger'>{error}</p>}
                <input
                    type='text'
                    className='form-control mb-2'
                    placeholder='Username' value={Username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input
                    type='password'
                    className='form-control mb-2'
                    placeholder='Password' value={Password}
                    onChange={(e) => setPassword(e.target.value)} />
      <button type='submit' disabled={loading} className='btn btn-primary'>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {data && <div>Response: {JSON.stringify(data)}</div>}
    </div>
    </form>
  );
};

export default Login;
