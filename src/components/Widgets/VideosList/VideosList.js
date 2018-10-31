import React, { Component } from 'react';
import VideosListTemplate from './VideosListTemplate';
import { firebaseVideos, firebaseTeams, firebaseLooper } from '../../../firebase';
import Button from '../Button/Button';
import styles from './videosList.module.css';

class VideosList extends Component {

  state = {
    videos: [],
    teams: [],
    start: this.props.start,
    amount: this.props.amount,
    end: this.props.start + this.props.amount,
    type: this.props.type
  }

  componentWillMount = () => {
    this.request(this.state.start, this.state.amount)
  }

  request = (start, end) => {
    if(this.state.teams.length < 1) {
      firebaseTeams.once('value')
        .then(snapshot => {
          const teams = firebaseLooper(snapshot)
          this.setState({
            teams
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

      firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then(snapshot => {
          const videos = firebaseLooper(snapshot);
          this.setState({
            videos: [...this.state.videos, ...videos],
            start,
            end
          })
        })
        .catch(err => {
          console.log(err)
        })
        
  }

  loadMore = () => {
    let end = this.state.amount + this.state.end;
    this.request(this.state.end + 1, end);
  }

  renderTitle = () => ( 
    this.props.title ? <h3><strong>NBA</strong> Videos</h3> : null
  );

  renderButton = () => (
    this.props.loadMore ? 
      <Button 
        type="loadMore"
        loadMore={this.loadMore}
        cta="Load More Videos"
      /> :
      null
  );

  renderVideos = () => {
    let template = null;

    switch(this.props.type) {
      case 'card': 
        template = <VideosListTemplate data={this.state.videos} teams={this.state.teams} />
        break;
      default:
        template = null;
    }

    return template;
  }

  render() {
    return (
      <div className={styles.videoList_wrapper}>
        { this.renderTitle() }
        { this.renderVideos() }
        { this.renderButton() }
      </div>
    )
  }
};

export default VideosList;