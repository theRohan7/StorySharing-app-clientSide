import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../CSS/Navbar.css";
import CreateStory from "./CreateStory";
import { Login, Register } from "../pages/Auth";
import { useNavigate, useLocation } from "react-router-dom";



function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [createStory, setCreateStory] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  const handleAddStory = () => {
    setCreateStory(true)
    setShowMobileMenu(false)
   
  }
  const handleCloseAddStory = () => {
    setCreateStory(false) 
  }
  const handleLogin = () => {
    navigate('/login')
  }
  const handleCloseLogin = () => {
    if(location.pathname === '/login') {
      navigate(-1);
    }
  }
  const handleRegister = () => {
    navigate('/register')
  }
  const handleCloseRegister = () => {
    if(location.pathname === '/register') {
      navigate(-1);
    }
  }

  const handleLogout = () => {
    setShowMobileMenu(false)
    logout();
  }
   

  return (
    <nav>
      {user ? (
        <div className="nav-container" >
          <div className="nav-btns">
            <button className="bookmark-btn" onClick={() => navigate("/bookmarks")} >
             <i className="fa-solid fa-bookmark"></i>  Bookmarks
            </button>
            <button className="addstory-btn" onClick={handleAddStory}>
              Add Story
            </button>
            <img
              src="https://images.unsplash.com/photo-1630026317249-c1c83b21ea07?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile-image"
              onClick={() => setShowUserMenu(!showUserMenu)}
            />
            <button className="menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
             <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <div className="hamburger-menu">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} >
             <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          {showUserMenu && (
            <div className="user-menu">
              <p>{user.username}</p>
              <button className="logout-btn"  onClick={handleLogout} >Logout</button>
            </div>
          )}
          {showMobileMenu && (
            <div className="mobile-menu">
              <div className="profile-container">
              <img 
               src="https://images.unsplash.com/photo-1630026317249-c1c83b21ea07?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               alt="Profile-image" 
              />
              <p>{user.username}</p>
              <button className="close-btn" onClick={() => setShowMobileMenu(false)} ><i className="fa-solid fa-xmark"></i></button>

              </div>
              <button onClick={handleAddStory} className="addstory-btn" >Add Story</button>
              <button onClick={() => navigate("/bookmarks")} className="bookmark-btn" ><i className="fa-solid fa-bookmark"></i> Bookmarks</button>
              <button onClick={handleLogout} className="logout-btn" >Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="nav-btns">
            <button className="register-btn" onClick={handleRegister} >Register</button>
            <button className="signin-btn" onClick={handleLogin} >Sign In</button>
          </div>
          <div className="hamburger-menu">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} >
             <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          {showMobileMenu && (
            <div className="mobile-menu"> 
              <button onClick={handleRegister} className="register-btn" style={{marginBottom: '2rem'}} >Register</button>
              <button onClick={handleLogin} className="signin-btn" >Login</button>
            </div>
          )}
        </div>
      )}

     { createStory && <CreateStory onClose={handleCloseAddStory} editingStory={null}/> }
     { showLogin && <Login onClose={handleCloseLogin} /> }
     { showRegister && <Register onClose={handleCloseRegister} /> }

    </nav>
  );
}

export default Navbar;
