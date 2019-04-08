import React, {Component} from 'react';
import '../App.css';
import {geolocated} from 'react-geolocated';
import sketch from './sketch';
import P5Wrapper from 'react-p5-wrapper';

class CurrentWeather extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }
    }
    
    componentDidMount() {
        let apicall = "https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=65802&days=5";
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                apicall = `https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=${position.coords.latitude},${position.coords.longitude}&days=10`;
            });
        } else {
            console.log(`it didn't work`);
        }
        console.log(apicall);
        fetch(apicall)
        .then(results => {
            return results.json();
        }).then(data => {
            let forecast = data.forecast.forecastday.map((element) => {
                return(
                    <div className="right-div right-text">
                        <div className="center-text">{element.date}</div>
                        <img src={element.day.condition.icon} style={{width:'100px', height:'100px'}} />
                        <P5Wrapper sketch={sketch} />
                        <div className="center-text">{`high ${element.day.maxtemp_f}`}</div> 
                    </div>
                )
            })
            this.setState({forecast: forecast});
        })
    }

    render() {
        return <div key={this.state.forecast}className="container">
                    {this.state.forecast}
                </div>
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(CurrentWeather);