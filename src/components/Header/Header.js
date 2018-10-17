import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SideDrawer from '../SideDrawer/SideDrawer';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Backdrop from '../Backdrop/Backdrop';

import styles from './header.module.css';

class Header extends Component {

  state = {
    showSideMenu: false
  }

  sideDrawerClickHandler = () => {
    this.setState((prevState) => ({ showSideMenu: !prevState.showSideMenu }))
  }

  closeDrawerClickHandler = () => {
    this.setState({
      showSideMenu: false
    })
  }

  logo = () => (
    <Link to="/">
      <img src="/images/nba_logo.png" alt="nba logo"/>
    </Link>
  )

  
  render() {
    const menuItems = [
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'News',
          link: '/news'
        },
        {
          text: 'Videos',
          link: '/videos'
        },
        {
          text: 'Sign In',
          link: 'sign-in'
        },
        {
          text: 'Sign Out',
          link: 'sign-out'
        }
      ]
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          {this.logo()}
        </div>
        <SideDrawer menuItems={menuItems} show={this.state.showSideMenu} />
        <div className={styles.spacer} />
        <nav className={styles.navbar}>
          <ul>
            { menuItems.map((item, i) => (
              <li key={i}>
                <Link to={`${item.link}`}>{item.text}</Link>
              </li>
            )) }
          </ul>
        </nav>
        <DrawerToggleButton drawerToggle={this.sideDrawerClickHandler} />
        <Backdrop show={this.state.showSideMenu} close={this.closeDrawerClickHandler} />
      </header>
    )
  }
};

export default Header;