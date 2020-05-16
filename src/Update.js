import * as R from 'ramda';

const MSGS = {
    'SHOW_FORM' : 'SHOW_FORM',
    'QUESTION_INPUT' : 'QUESTION_INPUT',
    'ANSWER_INPUT' : 'ANSWER_INPUT',
    'SAVE_FORM' : 'SAVE_FORM',
    'DELETE_FLASHCARD' : 'DELETE_FLASHCARD',
    'EDIT_FLASHCARD' : 'EDIT_FLASHCARD',
    'SHOWHIDE_FLASHCARD' : 'SHOWHIDE_FLASHCARD',
    'CHANGE_RANK' : 'CHANGE_RANK'
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

export function changeFlashcardRankMsg(id, rank) {
    return {
        type: MSGS.CHANGE_RANK,
        id,
        rank
    }
}

export function changeFlashcardDisplayMsg(showHideId) {
    return {
        type: MSGS.SHOWHIDE_FLASHCARD,
        showHideId
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
        show_answear: false,
        edit_mode: false,
        rank
    }
    return {...model,
        show_form: false,
        question: '',
        answear: '',
        next_id: next_id + 1,
        flashcards: [...flashcards, flashcard]}
}

function updateFlashcard(model) {

}

function showHideFlashcard(model, id) {
    const flashcards = model.flashcards.map(
        f => {
            if(f.id === id) {
                const {show_answear} = f;
                return {...f, show_answear: (!show_answear)}
            }
            return f;
        }
    );
    return {...model, flashcards}
}

function editFlashcard(model, id) {
    const flashcards = model.flashcards.map(
        f => {
            if(f.id === id) {
                const {edit_mode} = f;
                const {show_answear} = f;
                return {...f, edit_mode: (!edit_mode), show_answear: true}
            }
            return f;
        }
    );
    return {...model, flashcards}
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
            return editFlashcard(model, editId);
        }
        case MSGS.SHOWHIDE_FLASHCARD: {
            const {showHideId} = action;
            return showHideFlashcard(model, showHideId);
        }
        case MSGS.SAVE_FORM: {
            return addFlashcard(model);
        }
        default:
            return model;
    }
}

export default update;