import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import FilterSection from "../components/FilterSection";
import UserStories from "../components/UserStories";
import Stories from "../components/Stories";


function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <FilterSection />
      {user && <UserStories />}
      <Stories />
    </div>
  );
}

export default Home;
