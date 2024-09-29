import { createContext, useState } from "react";
import { fetchStoryById, fetchUserStories, filterStory, getBookmarkedStories, likeSlide, postStory, updateStory } from "../services/story";

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {

    const [stories, setStories] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [viewStoryData, setViewStoryData] = useState({});

    const changeFilter = (filter) => {
        setActiveFilters(filter);
    };

    const fetchStories = async () => {
        try {
            const response = await filterStory(activeFilters);
            if(response.status === 200) {
                setStories(response.data.data);
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const createStory = async (slides, category) => {
         try {
            const response = await postStory(slides, category);
            if(response.status === 200) {
                setUserStories(prevStories => [...prevStories, response.data.data]);
                setStories(prevStories => [...prevStories, response.data.data]);
            }
            
         } catch (error) {
            console.error(error)
         }
    }

    const editStory = async (storyId, slides, category) => {
        try {
            const response = await updateStory(storyId, slides, category);
            if(response.status === 200) {
                setUserStories(prevStories =>
                     prevStories.map(story => story._id === storyId ? response.data.data : story));
                setStories(prevStories =>
                     prevStories.map(story => story._id === storyId ? response.data.data : story));
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getUserStory = async () => {
        try {
            const response = await fetchUserStories();
            if(response.status === 200 ) {
            
                setUserStories(response.data.data)               
            }
        } catch (error) {
            console.error(error)
        } 
    }

    const storyById = async (storyId) => {
        try {
            const response = await fetchStoryById(storyId);
            if(response.status === 200) {
                setViewStoryData(response.data.data); 
                return response.data.data  
            } 
        } catch (error) {
            console.error(error)
        }
    }

    const likeStorySlide = async(storyId, slideId) => {
        try {
            const response = await likeSlide(storyId, slideId);
            if(response.status === 200) {
                return response.data;
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const fetchBookmarkStories = async() => {
        try {
            const response = await getBookmarkedStories();
            if(response.status === 200) {
                return response.data;
                
            }
        } catch (error) {
            console.error(error)    
        }
    }



    return(
        <StoryContext.Provider value={{fetchStories,createStory,editStory, getUserStory, fetchBookmarkStories ,likeStorySlide, storyById ,  changeFilter, activeFilters, stories, userStories, viewStoryData}} >
            {children}
        </StoryContext.Provider>
    )

    }