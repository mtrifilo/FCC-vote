/* global localStorage */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import store from '../redux/Store'
import { SET_CURRENT_USER } from '../redux/modules/auth'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../auth/setAuthorizationToken'
import Routes from './Routes'

const App = React.createClass({
  render () {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken)
      store.dispatch({type: SET_CURRENT_USER, user: jwt.decode(localStorage.jwtToken)})
    }
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {Routes()}
        </Router>
      </Provider>
    )
  }
})

export default App
