import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../../config';
import Header from './Header';
import VideosRelated from '../../../Widgets/VideosList/VideosRelated/VideosRelated';
import styles from '../../articles.module.css';

class NewsArticle extends Component {

  state = {
    video: [],
    team: [],
    teams: [],
    related: []
  }

  componentWillMount(){
    axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
    .then( response => {
        let video = response.data[0];

        axios.get(`${URL}/teams?id=${video.team}`)
        .then( response => {
            this.setState({
                video,
                team:response.data
            });
            this.getRelated();
        })
    })
}

getRelated = () => {
   
    axios.get(`${URL}/teams`)
    .then( response =>{
        let teams = response.data

        axios.get(`${URL}/videos?q=${this.state.teams.city}&_limit=3`)
        .then( response =>{
            this.setState({
                teams,
                related:response.data
            })
        })
    })
}

  render() {
    const { team, video } = this.state;
    return(
      <div className={styles.articleWrapper}>
        <Header teamData={team[0]}/>
        <div className={styles.videoWrapper}>
          <h1>{video.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${video.url}`}
          >
          </iframe>
        </div>
        <VideosRelated
          data={this.state.related}
          teams={this.state.teams}
        />
      </div>
    )
  }
};

export default NewsArticle;