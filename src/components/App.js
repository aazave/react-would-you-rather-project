import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import QuestionsList from './QuestionsList'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import { setAuthedUser } from '../actions/authedUser'

class App extends Component {


  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  logoutHandler = () => {
    this.props.dispatch(setAuthedUser(
      null
    ))
  }

  render() {

    return (
      <Router>
        <Fragment>
        <LoadingBar />
          <div className='container'>
            <Nav logout={this.logoutHandler} />
            {this.props.login === true ?
              <Login />
              : <div>
                <Route path='/' exact component={QuestionsList} />
                <Route path='/question/:question_id' component={QuestionPage} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    login: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
