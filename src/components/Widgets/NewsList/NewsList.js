import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseArticles, firebaseTeams, firebaseLooper } from '../../../firebase';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Button from '../Button/Button';
import CardInfo from '../CardInfo/CardInfo';

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
     firebaseTeams.once('value')
      .then(snapshot => {
        const teams = firebaseLooper(snapshot);
        this.setState({
          teams
        })
      })
    }

    this.request(this.state.start, this.state.amount);
  }

  request = (start, end) => {
    firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
      .then(snapshot => {
        const articles = firebaseLooper(snapshot);
        this.setState({
          items: [...this.state.items, ...articles],
          start, 
          end
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end + 1, end);
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
      case 'cardMain':
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
            <img src={`/images/articles/${item.image}`} alt={item.title} className="mr-3"/>
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