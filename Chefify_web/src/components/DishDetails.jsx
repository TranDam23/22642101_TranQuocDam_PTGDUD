import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./DishDetails.css"
const DishDetails = ({ dish }) => {
  const handleDelete = () => {
    onDelete(id); // Call the parent function with the user's ID
  };
  const { id, Name = "N/A", img = "N/A", minutes = "N/A", state = "N/A" } = dish;

  const navigate = useNavigate();
  // const { id } = useParams();
  return (
    <div className="dishes-card">
      <div className='dishes-content'>
        <div className='dishes-content-top'>
          <img src={img} alt="" />
        </div>
        <div className='dishes-content-bottom'>
          <p>{Name}</p>
          <p>Address: {minutes}</p>
          <div>{state}</div>
        </div>
      </div>

    </div>
  );
}

export default DishDetails;