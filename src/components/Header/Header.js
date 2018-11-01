import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../firebase';
import SideDrawer from '../SideDrawer/SideDrawer';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Backdrop from '../Backdrop/Backdrop';

import styles from './header.module.css';

class Header extends Component {

  state = {
    showSideMenu: false,
    menuItems: [
      {
        text: 'Home',
        link: '/',
        login: ''
      },
      {
        text: 'News',
        link: '/news',
        login: ''
      },
      {
        text: 'Videos',
        link: '/videos',
        login: ''
      },
      {
        text: 'Dashboard',
        link: '/dashboard',
        login: false
      },
      {
        text: 'Sign In',
        link: '/sign-in',
        login: true
      },
      {
        text: 'Sign Out',
        link: '/sign-out',
        login: false
      }
    ]
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

  element = (item, i) => (
    <li key={i}>
      <Link to={`${item.link}`}>{item.text}</Link>
    </li>
  )

  restricted = (item,i) => {
    let template = null;

    if( this.props.user === null && item.login ){
        template = this.element(item,i)
    }

    if(this.props.user !== null && !item.login){
        if(item.link === '/sign-out'){
            template = (
              <li key={i} 
                  onClick={()=>{
                      firebase.auth().signOut()
                      .then(()=>{
                          this.props.history.push("/")
                      })
                    }}
                  >
                  {item.text}
              </li>
            )

        } else {
            template = this.element(item,i)
        }
    }

    return template;
  }

  showItems = () => {
    return this.state.menuItems.map( (item,i) =>{
        return item.login !== '' ?
            this.restricted(item,i)
        :
            this.element(item,i)
    } )
  }
  
  render() {
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
                  { this.showItems() }
                </ul>
              </nav>
              <DrawerToggleButton drawerToggle={this.sideDrawerClickHandler} />
            </div>
          </div>
        </div>
        <SideDrawer 
          user={this.props.user}
          menuItems={this.state.menuItems} 
          show={this.state.showSideMenu} 
        />
        <Backdrop 
          show={this.state.showSideMenu} 
          close={this.closeDrawerClickHandler} 
        />
      </header>
    )
  }
};

export default withRouter(Header);