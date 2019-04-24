import React, {Component} from 'react';
import '../App.css';
import P5Wrapper from 'react-p5-wrapper';
import {Card} from 'react-bootstrap';
import sketch from '../sketches/sketch';
import config from '../config.json';
const ROOT_ADDRESS = `https://api.apixu.com/v1/forecast.json?key=${config.WEATHER_KEY}&q=`;
const GOOG_ADDRESS = `https://maps.googleapis.com/maps/api/geocode/json?key=${config.GOOG_KEY}&latlng=`;

export default class CurrentWeather extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }
        this.getWeather = this.getWeather.bind(this);
    }

    getLocation(lat, long) {
        let location = "Your Location";
        fetch(`${GOOG_ADDRESS}${lat},${long}`)
        .then(results => {
            return results.json();
        })
        .then(data => {
            console.log(data);
            location =  data.plus_code.compound_code;
        });
        return location;
    }

    getWeather(apicall, lat, long) {
        let location = new Promise((resolve, reject) => {
            setTimeout(function() {
                fetch(`${GOOG_ADDRESS}${lat},${long}`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    console.log(data);
                    resolve(data.plus_code.compound_code.slice(7));
                });
              }, 300);
        });
        location.then((locationName) => {

            fetch(apicall)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(this.getLocation(lat, long));
                let forecast = (
                    <Card className="right-div right-text" style={{ width: '18rem' }}>
                        <P5Wrapper class="center-block" variant="top" sketch={sketch} />
                        <Card.Body>
                            <Card.Title>{locationName}</Card.Title>
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
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
                this.setState({forecast: forecast});
            });
        })
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                this.getWeather(`${ROOT_ADDRESS}${lat},${long}`, lat, long);
            });
        } else {
            this.getWeather(`${ROOT_ADDRESS}10001`);
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.forecast}
            </div>                
        )
    }
}
