import React, { Component } from 'react';
import { firebaseDB, firebaseLooper, firebaseTeams } from '../../../../firebase';
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
    firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
      .then(snapshot => {
        let video = snapshot.val();

        firebaseTeams.orderByChild("teamId").equalTo(video.team).once('value')
          .then(snapshot => {
              const team = firebaseLooper(snapshot);
              this.setState({
                video,
                team
              })
          })
      })

}

getRelated = () => {
   
    // axios.get(`${URL}/teams`)
    // .then( response =>{
    //     let teams = response.data

    //     axios.get(`${URL}/videos?q=${this.state.teams.city}&_limit=3`)
    //     .then( response =>{
    //         this.setState({
    //             teams,
    //             related:response.data
    //         })
    //     })
    // })
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