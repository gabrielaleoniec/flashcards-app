import * as R from 'ramda';

const MSGS = {
    'SHOW_FORM' : 'SHOW_FORM',
    'QUESTION_INPUT' : 'QUESTION_INPUT',
    'ANSWER_INPUT' : 'ANSWER_INPUT',
    'SAVE_FORM' : 'SAVE_FORM',
    'DELETE_FLASHCARD' : 'DELETE_FLASHCARD',
    'EDIT_FLASHCARD' : 'EDIT_FLASHCARD'
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

export function deleteFlashcardMsg(deleteId) {
    return {
        type: MSGS.DELETE_FLASHCARD,
        deleteId
    }
}

export function editFlashcardMsg(editId) {
    return {
        type: MSGS.EDIT_FLASHCARD,
        editId
    }
}

function addFlashcard(model) {
    const {next_id, flashcards, question, answear, rank} = model;
            if (!question || !answear) {
                return model;
            }
    const flashcard = {
        id: next_id,
        question,
        answear,
        rank
    }
    return {...model,
        show_form: false,
        question: '',
        answear: '',
        next_id: next_id + 1,
        flashcards: [...flashcards, flashcard]}
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
        case MSGS.DELETE_FLASHCARD: {
            const {deleteId} = action;
            const {flashcards} = model;
            const updatedFlashcards = flashcards.filter(f => {if(f.id !== deleteId) return f});
            return {...model, flashcards: updatedFlashcards}
        }
        case MSGS.EDIT_FLASHCARD: {
            const {editId} = action;
            const {flashcards} = model;

            return {...model, flashcards: updatedFlashcards}
        }
        case MSGS.SAVE_FORM: {
            return addFlashcard(model);
        }
        default:
            return model;
    }
}

export default update;