import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './SliderTemplates';

class Slider extends Component {

  state = {
    news: []
  }

  componentWillMount = () => {
    firebaseArticles.limitToFirst(3).once('value')
      .then(snapshot => {
        const news = firebaseLooper(snapshot);        
        this.setState({
          news
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  
  
  render() {
    console.log(this.state.news)
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