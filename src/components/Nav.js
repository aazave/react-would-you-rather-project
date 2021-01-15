import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = props => {


  return (

    <nav className='nav'>
      <ul>
        <div>  {props.authedUser ? <div> Logged in as: {props.authedUser} <a href="/" onClick={props.logout}>(Logout)</a>
        </div> : null} </div>

        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>

  );

}

const mapStateToProps = ({ authedUser, users }, { logout }) => {

  return {
    authedUser: !!authedUser ? users[authedUser].name : null,
    logout
  }
}

export default connect(mapStateToProps)(Nav);


