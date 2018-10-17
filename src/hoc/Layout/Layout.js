import React, { Component } from 'react';
import './Layout.css';
import Header from '../../components/Header/Header';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        Footer
      </div>
    )
  }
}

export default Layout;