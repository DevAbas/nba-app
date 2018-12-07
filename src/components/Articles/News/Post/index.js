import React, { Component } from 'react';
import { firebaseDB, firebaseTeams, firebaseLooper, firebase } from '../../../../firebase'
import Header from './Header';
import styles from '../../articles.module.css';

class NewsArticle extends Component {

  state = {
    article: [],
    team: [],
    imageURL:''
  }

  componentWillMount = () => {
    const articleId = this.props.match.params.id;

    firebaseDB.ref(`articles/${articleId}`).once('value')
      .then(snapshot => {
        let article = snapshot.val();

        firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
          .then(snapshot => {
            const team = firebaseLooper(snapshot);
            this.setState({
              article,
              team
            })
            this.getImageURL(article.image)
          })
      })

  }

  getImageURL = (filename) =>{

    firebase.storage().ref('images')
    .child(filename).getDownloadURL()
    .then( url => {
        this.setState({
            imageURL: url
        })
    })

  } 

  render() {
    const { team, article } = this.state;
    return(
      <div className={styles.articleWrapper}>
        <Header
          teamData={team[0]}
          date={article.date}
          author={article.author}
        />
        <div className={styles.articleBody}>
          <h1>{article.title}</h1>
          <div className={styles.articleImage}
            style={{
              background: `url('/images/articles/${article.image}')`
            }}
          ></div>
          <div 
            className={styles.articleText}
            dangerouslySetInnerHTML={{
              __html:article.body
            }}
          >
          </div>
        </div>
      </div>
    )
  }
};

export default NewsArticle;