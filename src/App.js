import React, { Component } from 'react';
import WeatherInfo from './component/WeatherInfo';
import styles from './App.module.css'
//import axios from 'axios';

class App extends Component{ 
  render(){
  return (
    <div className={styles.App}>
      <WeatherInfo />
    </div>
  );
}
}
export default App;
