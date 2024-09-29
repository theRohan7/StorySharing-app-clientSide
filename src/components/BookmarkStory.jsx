import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import { useNavigate } from "react-router-dom";
import StoryCard from "./StoryCard";
import Navbar from "./Navbar";
import "../CSS/UserStories.css";

function BookmarkStory() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { fetchBookmarkStories } = useContext(StoryContext);

  const [bbookmarkStories, setBookmarkStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookmarkStory = async () => {
      try {
        setLoading(true);
        if (user) {
          const response = await fetchBookmarkStories();
          setBookmarkStories(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBookmarkStory();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!bbookmarkStories) return <p>No bookmark stories found.</p>;

  return (
    <>
    <Navbar />
  
    <div className="stories-container">
      <div className="bookmark-heading">
        <h2>Bookmark Stories</h2>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
      {bbookmarkStories.length === 0 ? (
        <div className="no-stories">
          <p> No Stories Available </p>
        </div>
      ) : (
        <>
          <div className="story-cards-container">
            {bbookmarkStories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                canEdit={false}
                canView={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
    </>
   
  );
}

export default BookmarkStory;
