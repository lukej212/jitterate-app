import React, {Component} from 'react';
import '../App.css';

export default class CurrentWeather extends Component {
    constructor() {
        super();
        this.state = {
            forecast: []
        }
    }

    componentDidMount() {
        fetch('http://api.apixu.com/v1/forecast.json?key=513d8003c8b348f1a2461629162106&q=65804&days=10')
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data);
            let forecast = data.forecast.forecastday.map((element) => {
                console.log(element.day.condition.icon);
                return(
                    <div class="right-div right-text">
                        <div class="center-text">{element.date}</div>
                        <img src={element.day.condition.icon} style={{width:'100px', height:'100px'}} />
                        <div class="center-text">{`high ${element.day.maxtemp_f}`}</div> 
                    </div>
                )
            })
            this.setState({forecast: forecast});
        })
    }

    render() {
        return (
            <div class="container">
                {this.state.forecast}
            </div>
        );
    }
}