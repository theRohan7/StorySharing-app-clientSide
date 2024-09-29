import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser, registerUser } from '../services/user';
import toast from 'react-hot-toast';
import "../CSS/Login.css"



function Register({onClose}) {

    const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username ) {
      setError(true);
      toast.error("Username is required");
    } else if(!formData.password) {
      toast.error("Password is required");
      setError(true);
    }

    try {
      const { username, password } = formData;
      const response = await registerUser({ username, password });

      if(response.status === 201) {
        toast.success("User registered succesfully.")
        login(response.data.data, response.data.data.token)
        setError(false)
        onClose()
        navigate("/")
      }
    } catch (error) {
      setError(true);
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

   

  return (
    <div className='overlay'>
    <div onSubmit={handleSubmit} className="box-container">
    <button className='close-form-btn' onClick={() => navigate(-1)}  >X</button>
      <h3>Register</h3>
      <form className="auth-form">
        <div className="label-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter username"
            value={formData.username}
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
            value={formData.password}
          />
        </div>
        <button type="submit" disabled={loading} className="register-btn">
          {loading ? (
            "Loading.."
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
</div>
  )
}


function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        console.log("submitting");
        setLoading(true);
        e.preventDefault();
        if (!formData.username || !formData.password) setError(true);
        try {
          const { username, password } = formData;
          const response = await loginUser({ username, password });
           console.log(response);
           
          if(response.status === 200) {
            toast.success("User Logged In succesfully.")
            login(response.data.data, response.data.data.token)
            setError(false)
            navigate(-1);
          }
    
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className="overlay">
      <div onSubmit={handleSubmit} className="box-container">
          <button className='close-form-btn' onClick={() => navigate(-1)}  >X</button>
          <h3>Sign In</h3>
          <form className="auth-form">
            <div className="label-input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Enter username"
                style={{borderColor: error ? "red" : ""}}
                value={formData.username}
              />
            </div>
            <div className="label-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                style={{borderColor: error ? "red" : ""}}
                value={formData.password}
              />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? (
                "Loading.."
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
    </div>
  )
}

export  {Login, Register};

