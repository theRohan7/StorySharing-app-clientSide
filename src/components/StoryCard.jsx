import React, {  useState } from "react";
import "../CSS/StoryCard.css";
import CreateStory from "./CreateStory";
import { useNavigate } from "react-router-dom";
// import ViewStory from "./ViewStory";



function StoryCard({ story, canEdit, canView }) {


  const navigate = useNavigate();
  const [editStoryForm, setEditStoryForm] = useState(false)

  const editStory = () => {
    setEditStoryForm(true)
  }
  const closeEditStory = () => {
    setEditStoryForm(false)
  }


  return (
    <>
    <div className="story-card" >
      <img
        src={story.storySlides[0].mediaURL}
        alt="image of 1st slide of story"
        onClick={() => navigate(`/view-story/${story._id}`)}
      />
      <div className="story-content">
        <h3>{story.storySlides[0].heading }</h3>
        <p>{story.storySlides[0].description }</p>
      </div>
      <button
        className="edit-btn"
        style={{ display: `${canEdit ? "block" : "none"}` }}
        onClick={editStory}
      >
        Edit
      </button>
    </div>
    {editStoryForm  && <CreateStory editingStory={story} onClose = {closeEditStory} /> }
  
    </>
  );
}

export default StoryCard;
