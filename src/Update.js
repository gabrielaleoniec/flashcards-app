const MSGS = {
    'SHOW_FORM' : 'SHOW_FORM',
    'QUESTION_INPUT' : 'QUESTION_INPUT',
    'ANSWER_INPUT' : 'ANSWER_INPUT',
    'SAVE_FORM' : 'SAVE_FORM'
}

export function showFormMsg(show_form) {
    return {
        type: MSGS.SHOW_FORM,
        show_form
    }
}

export function questionInputMsg(question) {
    return {
        type: MSGS.QUESTION_INPUT,
        question
    }
}

export function answerInputMsg(answer) {
    return {
        type: MSGS.ANSWER_INPUT,
        answer
    }
}

const saveFormMsg = {
    type: MSGS.SAVE_FORM
}

function update(model, action) {
    switch (action.type) {
        case MSGS.SHOW_FORM: {
            const {show_form} = action;
            return {...model, show_form}
        }
        case MSGS.QUESTION_INPUT: {
            const {question} = action;
            return {...model, question}

        }
        case MSGS.ANSWER_INPUT: {
            const {answer} = action;
            return {...model, answer}
        }
        default:
            return model;
    }
}

export default update;