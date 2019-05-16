import React, {Component} from 'react';
import '../App.css';
import P5Wrapper from 'react-p5-wrapper';
import {Card} from 'react-bootstrap';
import rain from '../sketches/rain';
import sunny from '../sketches/sunny';
import cloudy from '../sketches/cloudy';
import pcloudy from '../sketches/pcloudy';
import storms from '../sketches/storms';
const ROOT_ADDRESS = `https://api.apixu.com/v1/forecast.json?days=6&key=5354360a83f54cd69d2163637190104&q=`;

export default class Forecast extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }
        this.getWeather = this.getWeather.bind(this);
        this.weekdays = ["Empty", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    }

    getWeather(apicall) {
        fetch(apicall)
        .then(results => {
            return results.json();
            })
            .then(data => {
            let forecast =  data.forecast.forecastday.map((element, index) => {
                let dayNum = new Date(element.date).getDay()+1;
                let date = new Date(element.date);
                let weathercode = element.day.condition.code;
                let weatherAnim;
                if(weathercode === 1000)
                    weatherAnim = <P5Wrapper class="center-block" variant="top" sketch={sunny} />
                else if(weathercode === 1003)
                    weatherAnim = <P5Wrapper class="center-block" variant="top" sketch={pcloudy} />
                else if(weathercode === 1006 || weathercode === 1009 || weathercode === 1135 || weathercode === 1147)
                    weatherAnim = <P5Wrapper class="center-block" variant="top" sketch={cloudy} />
                else if(weathercode === 1087 || weathercode === 1195 || weathercode === 1243 || weathercode === 1246 
                    || weathercode === 1276 || weathercode === 1279 || weathercode === 1282)
                    weatherAnim = <P5Wrapper class="center-block" variant="top" sketch={storms} />
                else 
                    weatherAnim = <P5Wrapper class="center-block" variant="top" sketch={rain} />
                return(
                    <Card key={index} className="right-div right-text" style={{ width: '18rem' }}>
                        {weatherAnim}
                        <Card.Body>
                            <Card.Title>{`${this.weekdays[dayNum]} ${date.getMonth() + 1}/${date.getDate() + 1}`}</Card.Title>
                            <div className="bottom-space">
                                <div>{element.day.condition.text}</div>
                            </div>
                            <div className="bottom-space">
                                <div>{`Sunrise: ${element.astro.sunrise}`}</div>
                                <div>{`Sunset: ${element.astro.sunset}`}</div>
                            </div>
                            <div className="bottom-space">
                                <div>{`Low: ${element.day.mintemp_f}`}&#176;F</div>
                                <div>{`High: ${element.day.maxtemp_f}`}&#176;F</div>
                            </div>
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
