import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../config';

import styles from './newsList.module.css';

class NewsList extends Component {

  state = {
    items: [],
    start: this.props.start,
    amount: this.props.start + this.props.amount,
    type: this.props.type
  }

  componentWillMount = () => {
    axios.get(`${URL}/articles?_start=${this.state.start}&_end=${this.state.amount}`)
      .then(result => {
        this.setState({
          items: result.data
        })
      })
  }

  renderNews = (type) => {
    let template = null;

    switch(type) {
      case 'card':
        template = this.state.items.map((item, i) => (
          <div key={i} className="col-md-5">
            something
          </div>
        ));
      break;
      default:
        template = null;
    }
    return template
  }
  

  render() {
    return (
      <div className={styles.newsList}>
        { console.log(this.state.items) }
        { this.renderNews(this.state.type) }
      </div> 
    )
  }
}

export default NewsList;