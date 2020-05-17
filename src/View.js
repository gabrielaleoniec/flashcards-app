import { h } from 'virtual-dom';
import hh from 'hyperscript-helpers';

import {
    showFormMsg,
    questionInputMsg,
    answerInputMsg,
    saveFormMsg,
    deleteFlashcardMsg,
    editFlashcardMsg,
    changeFlashcardDisplayMsg,
    changeFlashcardRankMsg
} from './Update';

const { div, pre, button, i, h1, h2, label, textarea, a } = hh(h);

function dLabel(label) {
    return h2(
        {className: 'f4 mt2 mb1 p0'},
        label
    )
}

function displayAnswer(dispatch, flashcard) {
    const dButton = displayButton.bind(null, dispatch);
    const chRank = changeFlashcardRankMsg.bind(null, flashcard.id);
    if (!flashcard.show_answer) {
        return a({
            className: 'underline pointer',
            onclick: e => dispatch(changeFlashcardDisplayMsg(flashcard.id))
        }, 'Show answer');
    }

    return div(
        [
            flashcard.edit_mode?'':a({
                className: 'underline pointer',
                onclick: e => dispatch(changeFlashcardDisplayMsg(flashcard.id))
            }, 'Hide answer'),
            flashcard.edit_mode?displayField(dLabel('Answer'), flashcard.answer, e => dispatch(answerInputMsg(e.target.value))):div({className: 'w-100 mv2 f3'}, flashcard.answer),
            flashcard.edit_mode?
            dButton('moon-gray', 'Save', saveFormMsg(flashcard.id)):
                div({ className: 'flex justify-between mv2' }, [
                    dButton('orange', 'Bad', chRank(flashcard.rank)),
                    dButton('light-purple', 'Good', chRank(flashcard.rank + 1)),
                    dButton('green', 'Great', chRank(flashcard.rank + 2)),
                    ]
                ),
        ]
    )
}

function displayQuestion(dispatch, flashcard) {
    if(flashcard.edit_mode) {
        return displayField(dLabel('Question'), flashcard.question, e => dispatch(questionInputMsg(e.target.value)))
    }
    return div(
        {className: 'f3 w-100 mv2'},
        [   dLabel('Question'),
            flashcard.question,
            i({
                className: 'fa fa-edit ml2 grow pointer',
                onclick: e => dispatch(editFlashcardMsg(flashcard.id))
            })
        ]
    );
}

function displayButton(dispatch, color, label, func) {
    return button(
        {
            className: 'pv1 ba b--dark-gray ph3 bg-' + color + ' grow pointer f3 white',
            type: 'button',
            onclick: e => dispatch(func)
        },
        label,
    );
}

function displayFlashCard(dispatch, flashcard) {
    return div({
        className: 'ba bg-yellow mw6 mv3 ph3 pv2 shadow-5'
    },
        [
            i({
                className: 'fa fa-trash fa-2x fr grow pointer',
                onclick: e => dispatch(deleteFlashcardMsg(flashcard.id))
            }),
            displayQuestion(dispatch, flashcard),
            displayAnswer(dispatch, flashcard)
        ]
    )
}

function displayFlashCards(dispatch, model) {
    const { flashcards } = model;
    return div({},
        flashcards.map(flashcard => displayFlashCard(dispatch, flashcard))
    )
}

function displayField(labelText, value, onchange) {
    return label({ className: 'db w-100 mv2' }, [
        dLabel(labelText),
        textarea({
            className: 'pv1 ph2 w-100 mv1',
            value,
            onchange
        })
    ])
}

function displayForm(dispatch, model) {
    if (!model.show_form) {
        return null;
    }
    return div({ className: 'ba bg-yellow mw6 mv3 ph3 pv2 shadow-5' }, [
        i({
            className: 'fa fa-close fa-2x fr grow pointer',
            onclick: e => dispatch(showFormMsg(false))
        }),
        displayField(dLabel('Question'), model.question, e => dispatch(questionInputMsg(e.target.value))),
        displayField(dLabel('Answer'), model.answer, e => dispatch(answerInputMsg(e.target.value))),
        displayButton(dispatch, 'moon-gray', 'Save', saveFormMsg(null)),
    ]);
}

function view(dispatch, model) {
    const buttonText = [i({
        className: 'fa fa-plus mr2'
    }),
    'Add Flashcard'];
    return div({ className: 'w-70 center sans-serif' }, [
        h1({ className: 'f1 bb' }, 'Flashcard study'),
        displayButton(dispatch, 'dark-green', buttonText, showFormMsg(true)),
        displayForm(dispatch, model),
        displayFlashCards(dispatch, model),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;