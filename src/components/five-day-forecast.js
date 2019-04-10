import React, {Component} from 'react';
import '../App.css';
import {geolocated} from 'react-geolocated';
import sketch from './sketch';
import cities from '../cities'
import P5Wrapper from 'react-p5-wrapper';
import {Card, Nav, Button, Form, FormControl} from 'react-bootstrap';

export default class FiveDay extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }
    }
    
    componentDidMount() {
        console.log(cities);
        let apicall = "https://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=65802&days=5";
        fetch(apicall)
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data.forecast.forecastday);
            let forecast = data.forecast.forecastday.map((element) => {                
                return(
                    <Card className="right-div right-text" style={{ width: '18rem' }}>
                                <P5Wrapper variant="top" sketch={sketch} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                    // <div className="right-div right-text">
                    //     <div className="right-div right-text">{element.date}</div>
                    //     <P5Wrapper sketch={sketch} />
                    //     <div className="center-text">{`high ${element.day.maxtemp_f}`}</div> 
                    // </div>
                )
            })
            this.setState({forecast: forecast});
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.forecast}
                </div>
            </div>
                
        )
    }
}

// export default geolocated({
//     positionOptions: {
//       enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
//   })(CurrentWeather);