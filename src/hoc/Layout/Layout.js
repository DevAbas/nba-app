import React, { Component } from 'react';
import './Layout.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} />
          { this.props.children }
        <Footer />
      </div>
    )
  }
}

export default Layout;