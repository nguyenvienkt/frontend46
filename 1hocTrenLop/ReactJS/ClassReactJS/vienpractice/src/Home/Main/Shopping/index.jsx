import React, {Component} from 'react';
import Products from './Products';
import Detail from './Detail';

export default class Shopping extends Component {
  render() {
    return (
      <div>
        <Products />
        <Detail />
      </div>
    )
  }
}