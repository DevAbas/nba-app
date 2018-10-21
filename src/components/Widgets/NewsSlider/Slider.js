import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../config';
import SliderTemplates from './SliderTemplates';

class Slider extends Component {

  state = {
    news: []
  }

  componentWillMount = () => {
    axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
      .then(response => {
        this.setState({
          news: response.data
        })
      })
  }
  
  
  
  render() {
    return (
      <React.Fragment>
        <SliderTemplates 
          data={this.state.news} 
          type={this.props.type} 
          settings={this.props.settings} 
          grid={this.props.grid} 
        />
      </React.Fragment>
    )
  }
};

export default Slider;