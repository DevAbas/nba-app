import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../firebase';
import styles from './sideDrawer.module.css';

const SideDrawer = props => {

  const classes = [ styles.sideDrawer, styles.open ];
  let drawerClasses = classes[0];
  if(props.show) {
    drawerClasses = classes.join(' ')
  }

  const element = (item, i) => (
    <li key={i}>
      <Link to={`${item.link}`}>{item.text}</Link>
    </li>
  )

  const restricted = (item, i) => {
    let template = null;

    if(props.user === null && item.login) {
      template = element(item, i)
    }

    if(props.user !== null && !item.login) {
      if(item.login === '/sign-out') {
        template = (
          <li 
            key={i}
            onClick={() => {
              firebase.auth().signOut()
                .then(() => {
                  props.history.push("/")
                })
            }}
          >
            {item.text}
          </li>
        )
      } else {
        template = element(item, i)
      }
    }
    return template;
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        {props.menuItems.map((item, i) => (
          item.login !== '' ?
          restricted(item, i) :
          element(item, i)
        ))}
      </ul>
    </nav>
  )
};

export default withRouter(SideDrawer);