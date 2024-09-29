import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import StoryCard from './StoryCard';
import "../CSS/UserStories.css" ;
import { StoryContext } from '../contexts/StoryContext';

function UserStories() {

    const {user} = useContext(AuthContext);
    const {userStories, getUserStory} = useContext(StoryContext)
    const [showAllStories, setShowAllStories] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
       const fetchUserStory = async () => {
        setLoading(true);
        if(user) {
          await getUserStory();
        }
        setLoading(false);
       }

       fetchUserStory();

    },[user])

   

    const toggleShowMore = () => {
        setShowAllStories(!showAllStories);
      };


    if(loading) {
        return  <p>Loading...</p>    
    
    } 
    
  return (
    <div className="stories-container">
          <div className="heading">
            <h2>User Stories</h2>
          </div>
          {userStories.length === 0 ? (
            <div className="no-stories">
              <p> No Stories Available </p>
            </div>
          ) : (
            <>
              <div className="story-cards-container">
                {userStories
                  .slice(0, showAllStories ? userStories.length : 4)
                  .map((story) => ( 
                    <StoryCard
                      key={story._id}
                      story={story}
                      canEdit={true}
                      canView={false}
                    />
                  ))}
              </div>
              {userStories.length > 4 && (
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
  )
}

export default UserStories
