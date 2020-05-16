import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CustomerTable } from './components/Customers/CustomerTable';
import { StoresTable } from './components/Stores/StoresTable';
import { SalesTable } from './components/Sales/SalesTable';
import { ProductTable } from './components/Products/ProductTable';

import 'semantic-ui-css/semantic.min.css';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <Layout>
              <Route exact path='/' component={Home} />
              <Route path='/Customer' component={CustomerTable} />
              <Route path='/Product' component={ProductTable} />
              <Route path='/Store' component={StoresTable} />
              <Route path='/Sales' component={SalesTable} /> 
          </Layout>
    );
  }
}


