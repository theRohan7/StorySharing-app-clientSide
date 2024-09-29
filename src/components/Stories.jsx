import React, { useContext, useEffect, useState } from 'react'
import { StoryContext } from '../contexts/StoryContext'
import StoryCard from './StoryCard';

function Stories() {

  const {activeFilters,fetchStories, stories} = useContext(StoryContext)
  const [showAllStories, setShowAllStories] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([[]]);

  useEffect(() => {
    fetchStories(activeFilters)
  },[])

  const toggleShowMore = (category = null) => {
    if (category) {
      setExpandedCategories((prev) =>
        prev.includes(category)
          ? prev.filter(cat !== category)
          : [...prev, category]
      );
    } else {
      setShowAllStories(!showAllStories);
    }
  };
  

  return (
    <div className="stories-container">
      {activeFilters.length <= 0 ? (
        <div className="cards">
          <div className="heading">
            <h2>Top Stories</h2>
          </div>
          {stories.length === 0 ? (
            <div className="no-stories">
              <p>No stories Available</p>
            </div>
          ) : (
            <>
              <div className="story-cards-container">
                {stories
                  .slice(0, showAllStories ? stories.length : 4)
                  .map((story) => (
                    <StoryCard key={story._id} story={story}/>
                  ))}
              </div>
              {stories.length > 4 && (
                <button
                  className="show-more-btn"
                  onClick={() => toggleShowMore()}
                >
                  {showAllStories ? "Show less" : "Show more"}
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          {activeFilters.map((category, index) => {
            const filteredStories = stories.filter(
              (story) => story.Category === category
            );

            return (
              <div key={index}>
                <div className="heading">
                  <h2>Top Stories about {category}</h2>
                </div>

                {filteredStories.length === 0 ? (
                  <div className="no-stories">
                    <p>No Stories Available</p>
                  </div>
                ) : (
                  <>
                    <div className="story-cards">
                      {filteredStories
                        .slice(
                          0,
                          expandedCategories.includes(category)
                            ? filteredStories.length
                            : 4
                        )
                        .map((story) => (
                          <StoryCard
                            key={story._id}
                            story={story}
                            canEdit={false}
                            canView={true}
                          />
                        ))}
                    {filteredStories.length > 4 && (
                      <button
                        className="show-more-btn"
                        onClick={() => toggleShowMore(category)}
                      >
                        {expandedCategories.includes(category)
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  )
}

export default Stories
