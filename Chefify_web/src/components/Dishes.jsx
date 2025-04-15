import React from 'react'
import { Link } from "react-router-dom";
import "./Dishes.css"
import DishDetails from './DishDetails';
const Dishes = ({ dishes, title, titlep }) => {
    return (
        <div className='dishes-container'>
            <div className='dishes-title'>
                <h3>{title}</h3>
                <p>{titlep}</p>
            </div>
            <div className='dishes'>
                {dishes.map((dish) => (
                    <DishDetails
                        key={dish.id}
                        dish={dish}
                    // onDelete={() => onDeleteContact(contact.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dishes;