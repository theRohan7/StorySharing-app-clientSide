import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser, registerUser } from '../services/user';
import toast from 'react-hot-toast';
import "../CSS/Login.css"



function Register() {

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await registerUser({ username, password });
       console.log(response);
       
      if(response.status === 201) {
        toast.success("User Registered succesfully.")
        login(response.data.data.user, response.data.data.token)
        setError(false)
        navigate(-1);
      }

    } catch (error) {
      console.error(error.message);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  };

  const toggleShowpassword = () => {
    setShowPassword(!showPassword);
  }


  
   

  return (
    <div className="overlay">
      <div onSubmit={handleSubmit} className="box-container">
        <button className="close-form-btn" onClick={() => navigate(-1)}>
          X
        </button>
        <h3>Register</h3>
        <form className="auth-form">
          <div className="label-input">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              style={{ borderColor: error ? "red" : "" }}
              placeholder="Enter username"
              value={formData.username}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Password:</label>
            <div
              className="password-input-container"
              style={{ position: "relative" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                style={{ borderColor: error ? "red" : "", padding: "8px" }}
                value={formData.password}
              />
              <button
                type="button"
                className='pass-eye-btn'
                onClick={toggleShowpassword}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
          </div>
          {error && (
            <p
              className="error-message"
              style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}
            >
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} className="register-btn" style={{marginBottom: "30px"}}>
            {loading ? "Loading.." : "Register"}
          </button>
        </form>
        <div>Already have an account? <span onClick={() => navigate("/login")} style={{textDecoration: "underline", cursor: "pointer", color: "#FF7373", fontWeight: "bold"}}>Login</span></div>
      </div>
    </div>
  );
}


function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
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
          setError(error.message)
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      const toggleShowpassword = () => {
        setShowPassword(!showPassword);
      }

  return (
    <div className="overlay">
      <div onSubmit={handleSubmit} className="box-container">
          <button className='close-form-btn' onClick={() => navigate(-1)}  >X</button>
          <h3>Login</h3>
          <form className="auth-form">
            <div className="label-input">
              <label htmlFor="username">Username:</label>
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
              <label htmlFor="password">Password:</label>
              <div className="password-input-container" style={{position: "relative"}}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={{borderColor: error ? "red" : "", padding:"8px"}}
                  value={formData.password}
                />
                <button
                  type='button'
                  onClick={toggleShowpassword}
                  className='pass-eye-btn'
                >
                  {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i> }
                </button>
              </div>
            </div>
            {error && <p className="error-message" style={{color: "red",fontWeight: "bold", marginBottom: "10px"}}>{error}</p>}
            <button type="submit" disabled={loading} className="login-btn" style={{marginBottom:'30px'}}>
              {loading ? (
                "Loading.."
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div>Don't have an account? <span onClick={() => navigate("/register")} style={{textDecoration: "underline", cursor: "pointer", color: "#73ABFF", fontWeight: "bold"}}>Register</span></div>
        </div>
    </div>
  )
}

export  {Login, Register};

