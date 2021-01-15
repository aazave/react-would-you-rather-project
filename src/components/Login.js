import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

    state = {
        user: 'select',
        toHome: false
    }

    handleChange = (event) => {
        this.setState({ user: event.target.value });
    }

    onSignIn = () => {
        const { user } = this.state
        const { dispatch } = this.props

        dispatch(setAuthedUser(
            user
        ))

        this.setState(() => ({
            user: 'select',
            toDashboard: user ? true : false,
        }))

    }


    render() {

        const { user, toDashboard } = this.state

        if (toDashboard === true) {
            return <Redirect exact to='/' />
        }

        return (
            <div>
                <h3 className='center'>Login As:</h3>
                <select value={user} onChange={this.handleChange} className='dashboard-list'>
                    <option value="select" disabled>Select User</option>
                    {this.props.userIds.map((id) => (
                        <option value={id} key={id}>
                            {id}
                        </option>
                    ))}
                </select>
                <div>
                    <button onClick={this.onSignIn} disabled={user === 'select'}> Sign In </button>
                </div>
            </div>
        )

    }
}

const mapStateToProps = ({ users }) => {
    return {
        userIds: Object.keys(users)
            .sort((a, b) => users[b].id - users[a].id)
    }
}

export default connect(mapStateToProps)(Login)