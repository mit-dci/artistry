// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
     <div style={{'height':'100%', 'width':'100%', 'position':'relative'}}>
        {this.props.children}
      </div>
    );
  }
}
