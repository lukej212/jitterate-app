import React, {Component} from 'react';
import '../App.css';
import {geolocated} from 'react-geolocated';
import P5Wrapper from 'react-p5-wrapper';
import {Card} from 'react-bootstrap';
import sketch from './sketch';

class CurrentWeather extends Component {
    constructor() {
        super();
        this.state = {
            forecast: [],
            apicall: "https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=65802"
        }
        this.successFunction = this.successFunction.bind(this);
    }
    
    successFunction(position) {
        console.log('hey');
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log('Your latitude is :'+lat+' and longitude is '+long);
        this.setState({apicall: `https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=${lat},${long}`}, console.log(this.state));
        console.log('Your latitude is :'+lat+' and longitude is '+long);
    }
    errorFunction() {
        console.log('error');
    }

    componentWillMount() {
        console.log(this.state.apicall)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successFunction, this.errorFunction);
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
        console.log(this.state.apicall)
        fetch(this.state.apicall)
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data.current.temp_f);
            let forecast = (
                            <a href="/dashboard">
                                <Card className="right-div right-text" style={{ width: '18rem' }}>
                                <P5Wrapper class="center-block" variant="top" sketch={sketch} />
                                <Card.Body>
                                    <Card.Title>{`Your Location`}</Card.Title>
                                    <Card.Text>
                                        <div>{data.current.condition.text}</div>
                                        <div>{data.current.temp_f}&#176;F</div>
                                    </Card.Text>
                                    <Card.Text>
                                        <div>{`Wind: ${data.current.wind_mph} mph`}</div>
                                        <div>{`Humidity: ${data.current.humidity} %`}</div>
                                    </Card.Text>
                                    <Card.Text>
                                        <div>{`Low: ${data.forecast.forecastday[0].day.mintemp_f}`}&#176;F</div>
                                        <div>{`High: ${data.forecast.forecastday[0].day.maxtemp_f}`}&#176;F</div>
                                    </Card.Text>
                                    {/* <Button variant="primary">5 Day Forecast</Button> */}
                                </Card.Body>
                                </Card>
                            </a>
                            
                            )
            this.setState({forecast: forecast});
        });
    }

    render() {
        return (
            <div className="container">
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