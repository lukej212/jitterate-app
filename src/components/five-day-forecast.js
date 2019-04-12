import React, {Component} from 'react';
import '../App.css';
import {geolocated} from 'react-geolocated';
import sketch from './sketch';
import cities from '../cities'
import states from '../states'
import P5Wrapper from 'react-p5-wrapper';
import {Card, Nav, Button, Form, FormControl} from 'react-bootstrap';

export default class FiveDay extends Component {
    constructor() {
        super();
        this.state = {
            cityCards: []
        }
    }

    getAbbrev(stateName) {
        for (let state of states) {
            if(state.name == stateName){
                return state.abbreviation;
                break;
            }
        }
    }
    
    componentDidMount() {
        let cardsAry = [];
        cities.forEach(city => {
            let apicall = `https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=${city.latitude},${city.longitude}`;
            fetch(apicall)
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data)
                let abbrev = this.getAbbrev(city.state);
                cardsAry.push(
                    <Card className="right-div right-text" style={{ width: '18rem' }}>
                        <P5Wrapper class="center-block" variant="top" sketch={sketch} />
                        <Card.Body>
                            <Card.Title>{`${city.city}, ${abbrev}`}</Card.Title>
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
                            <Button variant="primary">5 Day Forecast</Button>
                        </Card.Body>
                    </Card>
                )
                this.setState({cityCards: cardsAry});
            });
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.cityCards}
                </div>
                <Button className="center-block" variant="secondary" size="sm">
                    Add city
                </Button>
                <Button className="btn btn-default btn-circle btn-lg">
                    <i className="fa fa-check">
                    </i>
                </Button>
            </div>
        )
    }
}
