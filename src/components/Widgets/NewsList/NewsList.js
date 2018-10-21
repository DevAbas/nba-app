import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Button from '../Button/Button';
import CardInfo from '../CardInfo/CardInfo';
import { URL } from '../../../config';

import styles from './newsList.module.css';

class NewsList extends Component {

  state = {
    items: [],
    teams: [],
    start: this.props.start,
    amount: this.props.amount,
    end: this.props.start + this.props.amount,
    type: this.props.type
  }

  componentWillMount = () => {
    if(this.state.teams.length < 1) {
      axios.get(`${URL}/teams`)
        .then(result => {
          this.setState({
            teams: result.data
          })
        })
    }

    this.request(this.state.start, this.state.amount);
  }

  request = (start, end) => {
    axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
      .then(result => {
        this.setState({
          items: [...this.state.items, ...result.data]
        })
      })
  }

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end);
  }

  renderNews = (type) => {
    let template = null;

    switch(type) {
      case 'card':
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter
            }}
            timeout={500}
            key={i}
          >
            <div className="media">
              <div className="media-body">
                <h5 className="mt-0">
                  <Link to={`/articles/${item.id}`}>
                    <CardInfo teams={this.state.teams} team={item.team} date={item.date} />
                    <h5>{item.title}</h5>
                  </Link>
                </h5>
              </div>
            </div>
          </CSSTransition>
        ));
      break;
      default:
        template = null;
    }
    return template
  }
  

  render() {
    return (
      <div className={this.props.grid}>
        <TransitionGroup
          component="div"
          className="list"
        >
          { this.renderNews(this.state.type) }
        </TransitionGroup>
        <Button 
          type="loadMore"
          loadMore={this.loadMore}
          cta="Load More News"
        />
      </div>
    )
  }
}

export default NewsList;