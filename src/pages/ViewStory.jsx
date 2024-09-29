import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { StoryContext } from "../contexts/StoryContext";
import "../CSS/ViewStory.css";
import { saveStory } from "../services/story";

function ViewStory() {

  const navigate = useNavigate()
  const { storyId } = useParams();
  const { user } = useContext(AuthContext);
  const { storyById, likeStorySlide } = useContext(StoryContext);

  const [storyData, setStoryData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shared, setShared] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const slides = storyData?.storySlides || [];

  useEffect(() => {
    const getStoryById = async () => {
      try {
        setloading(true);
        const data = await storyById(storyId);
        setStoryData(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch story data");
        console.error(error);
      } finally {
        setloading(false);
      }
    };

    getStoryById();
  }, [storyId]);

  useEffect(() => {
    if(!storyData || !storyData.storySlides) return;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev !== slides.length - 1 ? prev + 1 : prev));
    }, [15000]);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev !== 0 ? prev - 1 : prev));
  };
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev !== slides.length - 1 ? prev + 1 : prev));
  };

  const handleLikeSlide = async(storyId, slideId) => {
    if(!user) {
      navigate('/login')
      return;
    }
    try {
      const response = await likeStorySlide(storyId, slideId)
      
      const updatedLikesCount = response.data.likesCount;
      const isLiked = response.message.includes('added');

      const updatedSlides = [...slides];
      updatedSlides[currentSlide].likesCount = updatedLikesCount

      if(isLiked) {
        updatedSlides[currentSlide].likedBy.push(user._id);
      } else {
        updatedSlides[currentSlide].likedBy = updatedSlides[currentSlide].likedBy.filter(id => id !== user._id);
      }

      setStoryData(prev => ({...prev, storySlides: updatedSlides}));
      
    } catch (error) {
      console.error(error)
    }
    
  };

  const handleBookmarkStory = async(storyId) => {
    if(!user) {
      navigate('/login')
      return;
    }
    setIsBookmarked(prev => !prev)
    try {
      const response = await saveStory(storyId)
      if(response.status === 200){
        console.log(response.data);
        
      }
    } catch (error) {
      console.error(error)
      setIsBookmarked(prev => !prev)
    }
  }

  const handleShareStory = useCallback((storyId) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/view-story/${storyId}`)
      .then(() => {
        setShared(true);
        setTimeout(() => {
          setShared(false);
        }, 2000);
      });
  },[]);

  const isVideoUrl =  (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    return videoExtensions.some(extension => url.toLowerCase().endsWith(extension));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;
  if (!storyData || !storyData.storySlides || storyData.storySlides.length === 0 ) return <p>No Story Data Available</p>;

  return (
    <div className="overlay">
      <div className="slide-container">
        <div className="progress-bar-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`progress-bar ${
                index <= currentSlide ? "active" : ""
              }`}
            />
          ))}
        </div>
        {isVideoUrl(slides[currentSlide].mediaURL) ? (
          <video
           src={slides[currentSlide].mediaURL}
           autoPlay
           muted
           playsInline
          />
          
        ): (
          <img src={slides[currentSlide].mediaURL} alt="Slide Content Image" />
        )}
        <div className="slide-content">
          <h3>{slides[currentSlide].heading}</h3>
          <p>{slides[currentSlide].description}</p>
        </div>
        <div
          className="clipboard"
          style={{ display: `${shared ? "block" : "none"}` }}
        >
          Link Copied to clipboard
        </div>
        <div className="close-share">
          <button onClick={() => navigate("/")}>
            <i className="ri-close-line"></i>
          </button>
          <button onClick={() => handleShareStory(storyId)}>
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
        <div className="like-bookmark">
          <button onClick={() => handleBookmarkStory(storyId)}>
            <i
              className="ri-bookmark-fill"
              style={{ color: isBookmarked ? "blue" : "white" }}
            ></i>
          </button>
          <button
            onClick={() => handleLikeSlide(storyId, slides[currentSlide]._id)}
          >
            <i
              className="ri-heart-fill"
              style={{
                color: `${
                  slides[currentSlide].likedBy.includes(user._id)
                    ? "red"
                    : "white"
                }`,
              }}
            >
              {slides[currentSlide].likesCount}
            </i>
          </button>
        </div>
      </div>
      <button className="next-slide-btn" onClick={handleNextSlide}>
        <i className="ri-arrow-right-s-line"></i>
      </button>
      <button className="prev-slide-btn" onClick={handlePrevSlide}>
        <i className="ri-arrow-left-s-line"></i>
      </button>
    </div>
  );
}

export default ViewStory;
