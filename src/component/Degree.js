import React from 'react';
import './Card.css';
const Degree = ({updateForecastDegree,degreeType}) => {
  return (
    <div>
    <div className="Radio">
        <div>
        <input
       
        type="radio"
        name="degree-type"
        id="celsius"
        value="celsius"
        checked={degreeType === 'celsius'}
        onChange={updateForecastDegree}
        />
        <label  htmlFor="celsius">Celsius</label>
        </div>
      
        <div>
        <input
       
        type="radio"
        name="degree-type"
        id="farenheit"
        value="fahrenheit"
        checked={degreeType === 'fahrenheit'} 
        onChange={updateForecastDegree}
        />
        <label  htmlFor="farenheit">Farenheit</label>
        </div>
      </div> </div >
    
  )
}

export default Degree;