import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionPage extends Component {

    state = {
        value: ''
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    submitAnswer = (e) => {
        e.preventDefault()
        const { question, dispatch } = this.props
        const { value } = this.state
        
        dispatch(handleAnswerQuestion(
            question.id,
            value
        ))

    }


    render() {

        const { question, answered, questionAuthor } = this.props
        const { value } = this.state

        if (question === null) {
            return <p>This Question Doesn't Exist</p>
        }

        const resultMetrics = {
            total: question.optionOne.votes.length + question.optionTwo.votes.length,
            optionOneVotes: question.optionOne.votes.length,
            optionTwoVotes: question.optionTwo.votes.length,
        }

        const { optionOne, optionTwo } = question

        const { total, optionOneVotes, optionTwoVotes } = resultMetrics

        return (
            <div>
                <div><span>{questionAuthor.name} asks:</span></div>
                <img
                    src={questionAuthor.avatarURL}
                    alt={`Avatar of ${questionAuthor.name}`}
                    className='avatar'
                />

                {(!!answered) ?
                    <div>
                        <h1>Results:</h1>
                        <div>
                            <div>
                                <span>Would you rather {optionOne.text}?</span>
                                <div>{((optionOneVotes / total) * 100).toFixed(2)}%</div>
                                <div>{optionOneVotes} out of {total} votes</div>
                            </div>
                            <div>
                                <span>Would you rather {optionTwo.text}?</span>
                                <div>{((optionTwoVotes / total) * 100).toFixed(2)}%</div>
                                <div><span>{optionTwoVotes} out of {total} votes</span></div>
                            </div>
                        </div>

                    </div>
                    : <form onSubmit={this.submitAnswer }>
                        <div> <span>Would You Rather...</span> </div>
                        <div className="radio" onChange={this.handleChange}>
                            <div><input type="radio" value="optionOne" checked={value === 'optionOne'} /> ...{optionOne.text}?</div>
                            <div><input type="radio" value="optionTwo" checked={value === 'optionTwo'} /> ...{optionTwo.text}?</div>
                        </div>
                        <button disabled={value === ''}>Submit</button>
                    </form>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    const { question_id } = props.match.params

    const question = questions[question_id]
    const answers = users[authedUser].answers

    return {
        question: question ? question : null,
        questionAuthor: question ? users[question.author] : null,
        answered: question ? answers[question.id] : null
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage));