import React, {Component} from 'react';
import {Button, Form, FormControl} from 'react-bootstrap';

const GOOG_KEY = "AIzaSyDqPqroIzA46OQw0REmCpjDZARqz7hI5cs";
let input = "3041 East Lamonta Drive"


export default class CitySearch extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
      // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${GOOG_KEY}`)
      //   .then.then(results => {
      //     return results.json();
      // }).then(data => {
      //   console.log(data);
      // })
    }
  
    render() {
      return (
        <Form inline>
              <FormControl type="text" placeholder="Search" value={this.state.value} onChange={this.handleChange} className="mr-sm-2" />
              <Button variant="outline-info" type="submit">Search</Button>
        </Form>
      );
    }
  }