import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {

    render() {
        const { question, user } = this.props

        if (question === null) {
            return <p>This Question Doesn't Exist</p>
        }

        const { author, id } = question

        return (
            <div>
                <img
                    src={user.avatarURL}
                    alt={`Avatar of ${author}`}
                    className='avatar'
                />
                <div> <span>{user.name} asks:</span></div>
                <div> <span>Would You Rather...</span> </div>
                <Link to={`/question/${id}`} ><button>View Poll</button></Link>
            </div>
        )
    }

}

const mapStateToProps = ({ questions, users }, { id }) => {
    const question = questions[id]
    const user = users[question.author]
    return {
        question: question ? question : null,
        user
    }
}

export default withRouter(connect(mapStateToProps)(Question));