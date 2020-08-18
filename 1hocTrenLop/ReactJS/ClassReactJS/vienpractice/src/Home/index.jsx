import React, {Component} from 'react';
import Header from './Header/header';
import Main from './Main';
import Footer from './Footer/footer';

export default class Home extends Component{
  render() {
    return (
      <>
      <Header />
      <Main />
      <Footer />
      </>
    )
  }
}