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
    <Link to="/" className={styles.logo}>
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
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-sm-4 col-xs-2">
              {this.logo()}
            </div>
            <div className="col-md-10">
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
            </div>
          </div>
        </div>
        <SideDrawer menuItems={menuItems} show={this.state.showSideMenu} />
        <Backdrop show={this.state.showSideMenu} close={this.closeDrawerClickHandler} />
      </header>
    )
  }
};

export default Header;