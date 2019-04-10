import React, {Component} from 'react';
import '../App.css';
import {geolocated} from 'react-geolocated';
import sketch from './sketch';
import P5Wrapper from 'react-p5-wrapper';
import CitySearch from './search-component';

class CurrentWeather extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }

    }
    
    componentDidMount() {
        let apicall = "https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=65802";
        fetch(apicall)
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data.current.temp_f);
            let forecast = ( 
                            <div className="right-div right-text">
                                <div className="center-text">{`Right Now ${data.current.temp_f}`}</div>
                                {/* <P5Wrapper sketch={sketch} /> */}
                                <div className="center-text">{`high ${data.current.temp_f}`}</div> 
                            </div>
                            )
            this.setState({forecast: forecast});
        });
    }

    render() {
        return (
            <div>
                {this.state.forecast}
            </div>                
        )
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(CurrentWeather);