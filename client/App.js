import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import Search from './components/Search'
import JobsPage from './components/Jobs/JobsPage'
import Filter from './components/Filter'
import Login from './components/Login'
import Register from './components/Register'

import Header from './components/Wrapper/Header'

import {isAuthenticated, notAuthenticated} from './authHelpers'

import {onLoad} from './actions'

import agent from './agent'

const mapState = state => ({
  appLoaded: state.common.appLoaded
})

const mapDispatchtoProps = dispatch => ({
  onLoad: (token, userId) =>
    dispatch(
      onLoad(token, userId, agent.getUser(userId, token))
    )
})

const AppContent = (props) => {
  if (props.loaded) {
    return (
      <div className="container">
        <Switch>
          <Route exact path ='/' component={JobsPage}/>
          <Route path ='/search' component={Search}/>
          <Route path ='/filter' component={Filter}/>
          <Route path ='/login' component={Login}/>
          <Route path ='/register' component={Register}/>
        </Switch>
      </div>
    )
  } else {
    return (
      <h1 className="text-center">Loading</h1>
    )
  }
}

class App extends Component {

  componentWillMount() {

    const token = window.localStorage.getItem('token')
    const userId = window.localStorage.getItem('userId')

    this.props.onLoad(token, userId)
  }

  render() {
    const appLoaded = this.props.appLoaded
      return (
        <div className="container-fluid">
          <Header />

          <br />

        <AppContent loaded={appLoaded}/>
          
        </div>
      )
  }
}

export default withRouter(connect(mapState, mapDispatchtoProps)(App));
