import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { StoryProvider } from "./contexts/StoryContext";
import Home from "./pages/Home";
import ViewStory from "./pages/ViewStory";
import { Login, Register } from "./pages/Auth";
import BookmarkStory from "./components/BookmarkStory";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isViewStoryPage = location.pathname.startsWith("/view-story");

  return (
    <>
   <Toaster />
    <AuthProvider>
      <StoryProvider>
        <Routes location={isLoginPage || isRegisterPage || isViewStoryPage ? { pathname: "/" } : location.pathname }
        >
          <Route path="/" exact element={<Home />} />
        </Routes>
        {isLoginPage && <Login />}
        {isRegisterPage && <Register />}
        {isViewStoryPage && 
         <Routes>
           <Route path="/view-story/:storyId" element={<ViewStory />} />
         </Routes>
        }
        <Routes>
          <Route path="/bookmarks" element={<BookmarkStory />} />
        </Routes>

      </StoryProvider>
    </AuthProvider>
    </>
  );
}

export default App;
