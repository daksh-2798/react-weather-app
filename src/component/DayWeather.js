import React from 'react';
import './Card.css';
var moment = require('moment');

const DayWeather = ({reading,degreeType}) => {
    let newDate = new Date();
    const weekDay = reading.dt *1000;
    newDate.setTime(weekDay);
    console.log(degreeType);
    const fahrenheit = Math.round(reading.main.temp);
  const celsius = Math.round((fahrenheit - 32) * 5/9);

    return(
        <div className="row">
        <div className="column">
        <div className="container">
        
        <h2>Temp:<br/>{degreeType === "celsius" ? celsius + "°C" : fahrenheit + "°F"}</h2>
        <h3>{moment(newDate).format('MMMM Do')}</h3>
        <h4>{moment(newDate).format('dddd')}</h4>
        
        {/* <h3>{Math.round(reading.main.temp)} °F </h3> */}
        
        </div>
        </div>
        </div>
        
    );

}

export default DayWeather;