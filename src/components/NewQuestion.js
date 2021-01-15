import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class NewQuestion extends Component {
    state = {
        questionOne: '',
        questionTwo: '',
        toDashboard: false
    }

    handleQuestionOneChange = e => {
        const questionOne = e.target.value

        this.setState(() => ({
            questionOne
        }))
    }

    handleQuestionTwoChange = e => {
        const questionTwo = e.target.value

        this.setState(() => ({
            questionTwo
        }))
    }

    submitAnswer = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { questionOne, questionTwo } = this.state

        dispatch(handleAddQuestion(
            questionOne,
            questionTwo
        ))

        this.setState(() => ({
            questionOne: '',
            questionTwo: '',
            toDashboard: (questionOne && questionTwo) ? true : false,
        }))

    }


    render() {
        const { questionOne, questionTwo, toDashboard } = this.state;

        if (toDashboard === true) {
            return <Redirect exact to='/' />
        }

        return (
            <div>
                <h1>New Question:</h1>
                <div>Would You Rather...?</div>
                <form onSubmit={this.submitAnswer}>
                    <div>Choice 1: <input value={questionOne} onChange={this.handleQuestionOneChange}></input></div>
                    <div>Choice 2: <input value={questionTwo} onChange={this.handleQuestionTwoChange}></input></div>
                    <button disabled={questionOne === '' || questionTwo === ''}>Submit</button>
                </form>
            </div>

        );
    }
}

export default connect()(NewQuestion)