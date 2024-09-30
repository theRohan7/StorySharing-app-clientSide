import React, { useContext, useEffect, useState } from "react";
import "../CSS/CreateStory.css";
import toast from "react-hot-toast";
import { StoryContext } from "../contexts/StoryContext";

function CreateStory({ editingStory, onClose }) {
  const { editStory, createStory, getUserStory } = useContext(StoryContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [slides, setSlides] = useState([
    { heading: "", description: "", mediaURL: "" },
    { heading: "", description: "", mediaURL: "" },
    { heading: "", description: "", mediaURL: "" },
  ]);

  useEffect(() => {
    if (editingStory) {
      setSlides(editingStory.storySlides || []);
      setCategory(editingStory.category || "");
    }
  }, [editingStory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsUploading(true);
      if (editingStory) {
        await editStory(editingStory._id, slides, category);
      } else {
        await createStory(slides, category);
      }
      onClose();
      setIsUploading(false)
      await getUserStory();
    } catch (error) {
      setError(error.message);
      setIsUploading(false);
    }
  };

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: "", description: "", mediaURL: "" }]);
    }
  };

  const removeSlide = (currentSlide) => {
    const updatedSlides = slides.filter((_, index) => index !== currentSlide);
    setSlides(updatedSlides);
  };

  const updateSlide = (currIndex, field, value) => {
    const updatedSlides = slides.map((slide, idx) => {
      if (idx === currIndex) {
        return { ...slide, [field]: value };
      }
      return slide;
    });
    setSlides(updatedSlides);
  };

  return (
    <div className="overlay">
      <div className="story-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <button type="button" className="close-form-btn" onClick={onClose}>
              X
            </button>
            <p className="desktop-view-p">Add upto 6 slides</p>
            <p className="mobile-view-p">Add Story to feed</p>
          </div>
          <div className="main-form">
            <div className="slide-navigation">
              {slides.map((_, index) => (
                <div className="slide-item" key={index}>
                  <button
                    type="button"
                    className={index === currentSlide ? "active" : ""}
                    onClick={() => setCurrentSlide(index)}
                  >
                    Slide {index + 1}
                  </button>

                  {index >= 3 && (
                    <div
                      className="remove-slide"
                      onClick={() => removeSlide(index)}
                    >
                      X
                    </div>
                  )}
                </div>
              ))}
              {slides.length < 6 && (
                <button type="button" onClick={addSlide} className="add-slide">
                  Add +
                </button>
              )}
            </div>
            <div className="slide-form">
              <div className="form-group">
                <label>Heading:</label>
                <input
                  type="text"
                  placeholder="Your heading"
                  value={slides[currentSlide].heading}
                  onChange={(e) =>
                    updateSlide(currentSlide, "heading", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  placeholder="Story Description"
                  value={slides[currentSlide].description}
                  onChange={(e) =>
                    updateSlide(currentSlide, "description", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Media URL:</label>
                <input
                  type="text"
                  name={`media${currentSlide}`}
                  placeholder="Add media url"
                  value={slides[currentSlide].mediaURL}
                  onChange={(e) =>
                    updateSlide(currentSlide, "mediaURL", e.target.value)
                  }
                />
              </div>
              <div className="category-section">
                <label>Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Nature">Nature</option>
                  <option value="Technology">Technology</option>
                  <option value="Medical">Medical</option>
                  <option value="India">India</option>
                </select>
              </div>
              {error && (
                <p
                  className="error-container"
                  style={{
                    color: "red",
                    fontSize: "1.25rem",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  {error}
                </p>
              )}
              {isUploading ? (
                <p className="upload-loader">Uploading...</p>
              ) : (
                <div className="buttons">
                  <div className="navigate-slide-btn">
                    <button
                      type="button"
                      disabled={currentSlide === 0}
                      className="prev-btn"
                      onClick={() => setCurrentSlide(currentSlide - 1)}
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      disabled={currentSlide === slides.length - 1}
                      onClick={() => setCurrentSlide(currentSlide + 1)}
                      className="next-btn"
                    >
                      Next
                    </button>
                  </div>
                  <button type="submit" className="post-btn">
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStory;
