import React, { useContext } from 'react'
import { StoryContext } from '../contexts/StoryContext'
import "../CSS/FilterSection.css"


const categories = [
    {
      id: 1,
      category: "All",
      img: "https://images.pexels.com/photos/2064826/pexels-photo-2064826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      category: "Food",
      img: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      category: "Travel",
      img: "https://images.pexels.com/photos/160483/hiker-traveler-trip-travel-160483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      category: "Nature",
      img: "https://images.pexels.com/photos/69776/tulips-bed-colorful-color-69776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      category: "Technology",
      img: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 6,
      category: "Medical",
      img: "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 7,
      category: "India",
      img: "https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

function FilterSection() {

  const {activeFilters, changeFilter } = useContext(StoryContext)
  const addFilters = (category) => {
    if(category === "All"){
        changeFilter([])
    } else {
        let updatedFilter = activeFilters.includes(category) ? activeFilters.filter((item) => item !== category) : [...activeFilters, category] 

        changeFilter(updatedFilter);
    }

  }


  return (
    <div className="filter-container">
        <div className="category-list">
        {categories.map((category) => (
            <div
            key={category.id}
            onClick={() => addFilters(category.category)}
            className={`category-card ${
                activeFilters.includes(category.category) ? "active" : ""
            }`}
            >
            <img src={category.img} className="category-img" />
            <span className="category-heading">{category.category}</span>
            </div>
        ))}
        </div>
    </div>
  )
}

export default FilterSection
