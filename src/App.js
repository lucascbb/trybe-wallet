import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={ Login } />
        <Route exact path="/trybe-wallet" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </>
    );
  }
}

export default App;
