import React, {Component} from 'react';
import '../App.css';
import P5Wrapper from 'react-p5-wrapper';
import {Card} from 'react-bootstrap';
import sketch from '../sketches/sketch';
import config from '../config.json';
const ROOT_ADDRESS = `https://api.apixu.com/v1/forecast.json?days=5&key=${config.WEATHER_KEY}&q=`;

export default class Forecast extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }
        this.getWeather = this.getWeather.bind(this);
        this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }

    getWeather(apicall) {
        let dayNum = new Date().getDay();
        fetch(apicall)
        .then(results => {
            return results.json();
            })
            .then(data => {
                console.log(data);
            let forecast =  data.forecast.forecastday.map((element, index) => {
                let dayOfWeek = dayNum + index <= 6 ? this.weekdays[dayNum + index] : this.weekdays[0];
                return(
                    <Card className="right-div right-text" style={{ width: '18rem' }}>
                    <P5Wrapper class="center-block" variant="top" sketch={sketch} />
                    <Card.Body>
                        <Card.Title>{dayOfWeek}</Card.Title>
                        <Card.Text>
                            <div>{element.day.condition.text}</div>
                        </Card.Text>
                        <Card.Text>
                            <div>{`Sunrise: ${element.astro.sunrise}`}</div>
                            <div>{`Sunset: ${element.astro.sunset}`}</div>
                        </Card.Text>
                        <Card.Text>
                            <div>{`Low: ${element.day.mintemp_f}`}&#176;F</div>
                            <div>{`High: ${element.day.maxtemp_f}`}&#176;F</div>
                        </Card.Text>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
                )
            })
            this.setState({forecast: forecast});
        })
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                console.log(`${lat},${long}`);
                this.getWeather(`${ROOT_ADDRESS}${lat},${long}`);
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
