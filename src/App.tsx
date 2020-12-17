import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import configureStore from './store';
import Routes from './Routes';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faDotCircle);

export const store = configureStore();

import {
  Layout
} from 'antd';

const { Content, Header, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
        <Layout>
          <Provider store={store}>
            <Router>
              <Routes />
            </Router>
          </Provider>
        </Layout>
    );
  }
}

export default App;
