import React from 'react';
import { Link } from 'react-router-dom';

import styles from './sideDrawer.module.css';

const SideDrawer = props => {

  const classes = [ styles.sideDrawer, styles.open ];
  let drawerClasses = classes[0];
  if(props.show) {
    drawerClasses = classes.join(' ')
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        {props.menuItems.map((item, i) => (
          <li key={i}>
            <Link to={`${item.link}`}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default SideDrawer;