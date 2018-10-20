import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config';
import styles from './footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Link to="/" className={styles.logo}>
      <img src="/images/nba_logo.png" alt="nba logo"/>
    </Link>
    <div className={styles.copyright}>
      @NBA {CURRENT_YEAR} All rights reserved
    </div>
  </footer>
)


export default Footer;