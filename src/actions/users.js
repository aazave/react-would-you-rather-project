export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }

}

export function addQuestionAnswer(authedUser, qid, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addUserQuestion(authedUser, question_id){
    return{
        type: ADD_USER_QUESTION,
        authedUser,
        question_id,
        
    }
}
