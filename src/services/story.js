import axios from "axios";
import { BACKEND_URL } from "../utils/constants.js"

const fetchUserStories = async() => {
    try {
      const URL = `${BACKEND_URL}/story/user-stories`
      const token = localStorage.getItem('story-token')

      const response = await axios.get(URL, {
        headers: {
            "Authorization" : token
        }
      })
      
      return response;
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const postStory = async(slides, category) => {
  try {   
      const URL = `${BACKEND_URL}/story/create-story`
      const token = localStorage.getItem('story-token')

      const response =await axios.post(URL, {slides, category}, {
          headers: {
              Authorization: token
          }
      })

      console.log(response);
      
      return response
  } catch (error) {
      throw new Error(error.response.data.message)
  }
}

const updateStory = async(storyId, slides, category) => {
  try {
      const URL = `${BACKEND_URL}/story/edit-story/${storyId}`
      const token = localStorage.getItem("story-token")

      const response =await axios.post(URL, {slides, category}, {
          headers: {
              Authorization: token
          }
      })

      console.log(response);
      
      return response
      
  } catch (error) {
      throw new Error(error.response.data.message)
  }
}

const fetchStoryById = async(storyId) => {
    try {
        const URL = `${BACKEND_URL}/story/${storyId}`
        const response = await axios.get(URL)
        return response;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const likeSlide = async (storyId, slideId) => {
    try {
        const URL = `${BACKEND_URL}/story/increment-likes`
        const token = localStorage.getItem('story-token')
    
        const response = await axios.post(URL,{ storyId, slideId }, {
            headers: {
                Authorization: token
            }
        })

        return response
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const saveStory = async (storyId) => {
    try {
        const URL = `${BACKEND_URL}/story/bookmark/${storyId}`
        const token = localStorage.getItem('story-token')

        const response = await axios.put(URL,{},{
            headers: {
                Authorization: token
            }
        })

        console.log(response);
        return response
        
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getBookmarkedStories = async() => {
    try {
        const URL = `${BACKEND_URL}/story/bookmark-stories`
        const token = localStorage.getItem('story-token')

        const response = await axios.get(URL, {
            headers: {
                "Authorization" : token
            }
        })
        
       return response; 
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    fetchUserStories,
    postStory,
    updateStory,
    fetchStoryById,
    saveStory,
    likeSlide,
    getBookmarkedStories
  
}