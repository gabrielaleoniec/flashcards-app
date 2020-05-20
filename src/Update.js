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

export function answerInputMsg(answer) {
    return {
        type: MSGS.ANSWER_INPUT,
        answer
    }
}

export function saveFormMsg(id) {
    return {
        type: MSGS.SAVE_FORM,
        id
    }
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
    const {next_id, flashcards, question, answer, rank} = model;
    if (!question || !answer) {
        return model;
    }

    const flashcard = {
        id: next_id,
        question,
        answer,
        show_answer: false,
        edit_mode: false,
        rank
    }
    return {...model,
        show_form: false,
        question: '',
        answer: '',
        next_id: next_id + 1,
        flashcards: [...flashcards, flashcard]}
}

const updateCards = R.curry((updateCard, card) => {
    if (updateCard.id === card.id) {
      return { ...card, ...updateCard };
    }
    return card;
  });

function updateFlashcard(model, id) {
    const {question, answer, flashcards} = model;
    const updatedFlashcards = flashcards.map(updateCards({id, question, answer, edit_mode: false, show_answer:false}));

    return {
        show_form: false,
        question: '',
        answer: '',
        flashcards: updatedFlashcards,
    };
}

function updateFlashcardRank(model, id, rank) {
    const {flashcards} = model;
    const updatedFlashcards = flashcards.map(updateCards({id, rank, edit_mode: false}));

    return {
        ...model,
        show_form: false,
        rank: null,
        flashcards: R.sortWith([
            R.ascend(R.prop('rank')),
            R.descend(R.prop('id'))
        ])(updatedFlashcards),
    };
}

function showHideFlashcard(model, id) {
    const flashcards = model.flashcards.map(
        f => {
            if(f.id === id) {
                const {show_answer} = f;
                return {...f, show_answer: (!show_answer)}
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
                return {...f, edit_mode: (!edit_mode), show_answer: true}
            }
            return f;
        }
    );
    const {question, answer} = model.flashcards[id];

    return {...model, question: question, answer: answer, flashcards}
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
        case MSGS.DELETE_FLASHCARD: {
            const {deleteId} = action;
            const {flashcards} = model;
            //R.reject(R.propEq('id', id), flashcards);
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
            const {id} = action;
            if(id === null) {
                return addFlashcard(model);
            }

            return updateFlashcard(model, id);
        }
        case MSGS.CHANGE_RANK: {
            const {id, rank} = action;
            return updateFlashcardRank(model, id, rank);
        }
        default:
            return model;
    }
}

export default update;