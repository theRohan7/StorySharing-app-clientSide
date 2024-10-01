import React, {  useState } from "react";
import "../CSS/StoryCard.css";
import CreateStory from "./CreateStory";
import { useNavigate } from "react-router-dom";



function StoryCard({ story, canEdit }) {


  const navigate = useNavigate();
  const [editStoryForm, setEditStoryForm] = useState(false)

  const editStory = () => {
    setEditStoryForm(true)
  }
  const closeEditStory = () => {
    setEditStoryForm(false)
  }

  const isVideoUrl =  (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    return videoExtensions.some(extension => url.toLowerCase().endsWith(extension));
  }


  return (
    <>
    <div className="story-card" >
    {isVideoUrl(story.storySlides[0].mediaURL) ? (
          <video
           src={story.storySlides[0].mediaURL}
           alt="Video thumbnail"
           onClick={() => navigate(`/view-story/${story._id}`)}
           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           preload="metadata"
          />
          
        ): (
          <img 
           src={story.storySlides[0].mediaURL} 
           alt="Slide Content Image" 
           onClick={() => navigate(`/view-story/${story._id}`)}
          />
        )}
      <div className="story-content">
        <h3>{story.storySlides[0].heading }</h3>
        <p>{story.storySlides[0].description }</p>
      </div>
      <button
        className="edit-btn"
        style={{ display: `${canEdit ? "block" : "none"}` }}
        onClick={editStory}
      >
       <i className="fa-solid fa-pen-to-square"></i> Edit
      </button>
    </div>
    {editStoryForm  && <CreateStory editingStory={story} onClose = {closeEditStory} /> }
  
    </>
  );
}

export default StoryCard;
