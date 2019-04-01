import React, {Component} from 'react';
import '../App.css';
import nap from '../giphy.gif';

export default class EditTodo extends Component {
    render() {
        return (
            <div class="container">
                <div class="right-div right-text">
                    <img src={nap} style={{width:'100px', height:'100px'}} />
                </div>
                <div class="right-div right-text">
                    <img src={nap} style={{width:'100px', height:'100px'}} />
                </div>
                <div class="right-div right-text">
                    <img src={nap} style={{width:'100px', height:'100px'}} />
                </div>
                <div class="right-div right-text">
                    <img src={nap} style={{width:'100px', height:'100px'}} />
                </div>
                <div class="right-div right-text">
                    <img src={nap} style={{width:'100px', height:'100px'}} />
                </div>
            </div>
        );
    }
}