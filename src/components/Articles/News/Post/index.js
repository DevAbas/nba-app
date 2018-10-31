import React, { Component } from 'react';
import { firebaseDB, firebaseTeams, firebaseLooper } from '../../../../firebase'
import Header from './Header';
import styles from '../../articles.module.css';

class NewsArticle extends Component {

  state = {
    article: [],
    team: []
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
          <div className={styles.articleText}>
            {article.body}
          </div>
        </div>
      </div>
    )
  }
};

export default NewsArticle;