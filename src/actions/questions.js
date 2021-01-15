import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addQuestionAnswer, addUserQuestion } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function answerQuestion(authedUser, qid, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(() => dispatch(answerQuestion(authedUser, qid, answer)))
            .then(() => dispatch(addQuestionAnswer(authedUser, qid, answer)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author
        })
            .then(function (question) {
                dispatch(addQuestion(question))
                dispatch(addUserQuestion(authedUser, question.id))
            })
            .then(() => dispatch(hideLoading()))
    }
}


