import React from 'react';

import styles from './drawerToggle.module.css';

const DrawerToggleButton = props => (
  <button className={styles.toggleBtn} onClick={props.drawerToggle}>
    <div className={styles.toggleBtn__line}></div>
    <div className={styles.toggleBtn__line}></div>
    <div className={styles.toggleBtn__line}></div>
  </button>
);

export default DrawerToggleButton;