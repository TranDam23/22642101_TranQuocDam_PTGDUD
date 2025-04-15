import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Recipe.css";
const Recipe = () => {
    return (
        <div className='Recipe'>
            <div className='title'>
                Salad Caprese
            </div>
            <p>Classic Italian Salad Caprese: ripe tomatoes, fresh <br></br>mozzarella, herbs, olive oil, and balsamic vingar ,<br /> create a refreshing dish for lunch or appetizer</p>
            <p>Salad Caprese</p>
            <button className="btn btn-outline-success me-2" type="submit">Login</button>
        </div>
    )
}

export default Recipe