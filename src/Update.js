import * as R from 'ramda';

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

export function answerInputMsg(answear) {
    return {
        type: MSGS.ANSWER_INPUT,
        answear
    }
}

export const saveFormMsg = {
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
            const {answear} = action;
            return {...model, answear}
        }
        case MSGS.SAVE_FORM: {
            const {flashcards, current_id, question, answear, rank} = model;
            const newId = R.pipe(R.defaultTo(0), id => id+1)(current_id);
            if (!question || !answear) {
                return model;
            }
            return {...model, flashcards: [
                ...flashcards,
                {   id: newId,
                    question,
                    answear,
                    rank,
                    show_answer: false}
            ]}
        }
        default:
            return model;
    }
}

export default update;