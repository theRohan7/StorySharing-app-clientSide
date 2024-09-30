import { createContext, useEffect, useState } from "react";
import { fetchStoryById, fetchUserStories, getBookmarkedStories, likeSlide, postStory, updateStory } from "../services/story";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {

    const [stories, setStories] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [viewStoryData, setViewStoryData] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getStories = async () => {
            
            try {
                setLoading(true);
                const data = await fetchStories(activeFilters);
                setStories(data); 
            } catch (error) {
                console.error(error.message)
            }finally {
                setLoading(false);
            }
            console.log("getStories func completed, loading stat: ", loading);
        }

        getStories(); 
    },[])

    const changeFilter = (filter) => {
        setActiveFilters(filter);
    };

    const fetchStories = async (activeFilters) => {
        try {
            const queryString = activeFilters.length >= 0 ? activeFilters.map(filter => `categories=${encodeURIComponent(filter)}`).join("&") : 'categories='
            const URL = `${BACKEND_URL}/story/filter?${queryString}` 
          
            const response = await axios.get(URL)  
            if(response.status === 200) {
                return response.data.data
            }
            
        } catch (error) {
            console.error(error)
            throw new Error(error.response.data.message)
        }
    }

    const createStory = async (slides, category) => {
         try {
            const response = await postStory(slides, category);
            if(response.status === 200) {
                toast.success("Story Created Successfully");
                setUserStories(prevStories => [...prevStories, response.data.data]);
                setStories(prevStories => [...prevStories, response.data.data]);
            }
            
         } catch (error) {
            throw new Error(error.message)
         }
    }

    const editStory = async (storyId, slides, category) => {
        try {
            const response = await updateStory(storyId, slides, category);
            if(response.status === 200) {
                toast.success("Story Edited Successfully");
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
            console.error(error.message)
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

    if(loading) {
        return (
            <div
             style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
                Fetching Stories &nbsp;
                <RotatingLines
                    visible={true}
                    height="50"
                    width="50"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
          </div>
        )
    }

    return(
        <StoryContext.Provider value={{fetchStories,createStory,editStory, getUserStory, fetchBookmarkStories ,likeStorySlide, storyById ,  changeFilter, activeFilters, stories, userStories, viewStoryData}} >
            {children}
        </StoryContext.Provider>
    )

    }