import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="row">
         <Header />
         {this.props.children}
         <Footer />
      </div>
    );
  }
}

export default App;