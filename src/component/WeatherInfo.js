
import axios from 'axios';
import React, { Component } from 'react';
import DayWeather from './DayWeather';
import './Card.css';
import Degree from './Degree';

class WeatherInfo extends Component {
        state = {
            dailyWeather: [],
            fullWeather: [],
            loading : true,
            chunkedData : [],
            pageIndex : 0,
            selectedDayData: [],
            degreeType: "fahrenheit",
            
  }

  
        componentDidMount = () =>{
            const urlapi =`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`;
            axios.get(urlapi)
            .then(response => { console.log(response);
            //.then(data => {
                const dailyWeather = response.data.list.filter(
                reading => reading.dt_txt.includes("18:00:00"))
                this.setState({
                    fullWeather : response.data.list,
                    dailyWeather : dailyWeather,
                    chunkedData: this.chunkArray(dailyWeather, 3),
                    loading : false,
                    selectedDayData: []
                },
                    () => console.log(this.state))
                } 
                // dailyWeather.slice
            )
        }

         chunkArray = (myArray, chunk_size)=>{
            var index = 0;
            var arrayLength = myArray.length;
            var tempArray = [];
            
            for (index = 0; index < arrayLength; index += chunk_size) {
                let myChunk = myArray.slice(index, index+chunk_size);
                // Do something if you want with the group
                tempArray.push(myChunk);
            }
        
            return tempArray;
        }

        updateForecastDegree = event => {
            this.setState({
              degreeType: event.target.value
            }, () => console.log(this.state))
          }

        showSelectedDayWeather = (dateTXT) => {
            dateTXT = "2021-07-08 18:00:00";
            let date = dateTXT.split(" ")[0]; 
            let updated = this.state.fullWeather.filter(data => {
                return data.dt_txt.includes(date);
            }).map(weatherData => {
                return weatherData.main.temp;
            });
            this.setState({selectedDayData : updated}) 
            console.log(this.state.selectedDayData);
        }

        formatDayWeather = () => {
             return this.state.chunkedData[this.state.pageIndex].map((reading,index) => 
            //  <div className="row">
            //  <div className="column">
            //  <div className="card">
                <DayWeather degreeType={this.state.degreeType} reading={reading} key={index}/>
                // </div></div></div>
                );
        }
        
        nextHandler = () => {
            const updatedPI = this.state.pageIndex + 1;
            this.setState({pageIndex : updatedPI});
        }

        prevHandler = () => {
            const updatedPI = this.state.pageIndex - 1;
            this.setState({pageIndex : updatedPI});
        }

              
        render(){
            let weatherinfo = <div className="card"> <p> Loading </p> </div>;
            if(!this.state.loading){
            weatherinfo = (
            <div className="card">
                <h1 style={{margin: 0}}>Weather App</h1>
                <h3>Munich</h3>
                <div><Degree updateForecastDegree={(e)=>this.updateForecastDegree(e)}/></div>
                <div className="Btn">
                <button className="Button" onClick={this.prevHandler} disabled={this.state.pageIndex === 0} >Prev</button>
                <button className="Button" onClick={this.nextHandler} disabled={!(this.state.chunkedData[this.state.pageIndex + 1]) }>Next</button>
                </div>
                <div className="Centre" onClick={this.showSelectedDayWeather}>{this.formatDayWeather()}</div>
            </div>);
            }
        return(
            <div >
                {/* <h1>Weather App</h1>
                <h3>Munich</h3>
                <div>{this.formatDayWeather()}</div> */}
                
                {weatherinfo}
                
                
            </div>
        );
}
}
export default WeatherInfo;