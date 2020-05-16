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
import app from './App';

const { div, pre, button, i, h1, label, textarea, a } = hh(h);

function displayAnswear(dispatch, flashcard) {
    if (!flashcard.show_answear) {
        return a({
            className: 'underline pointer',
            onclick: e => dispatch(changeFlashcardDisplayMsg(flashcard.id))
        }, 'Show answear');
    }

    return div(
        [
            a({
                className: 'underline pointer',
                onclick: e => dispatch(changeFlashcardDisplayMsg(flashcard.id))
            }, 'Hide answear'),
            div({ className: 'mv2' },
                flashcard.edit_mode?textarea(flashcard.answear):flashcard.answear),
            div({ className: 'flex justify-between mv2' }, [
                answearButton('orange', 'Bad', e => dispatch(changeFlashcardRankMsg(flashcard.id, flashcard.rank))),
                answearButton('light-purple', 'Good', e => dispatch(changeFlashcardRankMsg(flashcard.id, flashcard.rank + 1))),
                answearButton('green', 'Great', e => dispatch(changeFlashcardRankMsg(flashcard.id, flashcard.rank + 2)))
            ])
        ]
    )
}

function displayQuestion(dispatch, flashcard) {
    if(flashcard.edit_mode) {
        return textarea(flashcard.question);
    }
    return flashcard.question;
}

function answearButton(color, label, onclick) {
    return button(
        {
            className: 'pv1 ba b--dark-green ph3 bg-' + color + ' grow pointer f3 white',
            onclick
        },
        label,
    );
}

function displayFlashCard(dispatch, flashcard) {
    const { id } = flashcard;
    return div({
        className: 'ba bg-yellow mw6 mv3 ph3 pv2 shadow-5'
    },
        [
            i({
                className: 'fa fa-trash fa-2x fr grow pointer',
                onclick: e => dispatch(deleteFlashcardMsg(id))
            }),
            a('Question'),
            div({
                className: 'mv2 f3'
            }, [
                displayQuestion(dispatch, flashcard),
                i({
                    className: 'fa fa-edit ml2 grow pointer',
                    onclick: e => dispatch(editFlashcardMsg(id))
                })
            ]),
            displayAnswear(dispatch, flashcard)
        ]
    )
}

function displayFlashCards(dispatch, model) {
    const { flashcards } = model;
    return div({},
        flashcards.map(flashcard => displayFlashCard(dispatch, flashcard))
    )
}

function displayLabel(labelText, value, onchange) {
    return label({ className: 'db w-100 mv2' }, [
        labelText,
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
        displayLabel('Question', model.question, e => dispatch(questionInputMsg(e.target.value))),
        displayLabel('Answer', model.answer, e => dispatch(answerInputMsg(e.target.value))),
        button({
            className: 'ba b--gray pv1 ph3 bg-moon-gray grow pointer f4 white',
            type: 'button',
            onclick: e => dispatch(saveFormMsg)
        }, 'Save')
    ]);
}

function displayCreateButton(onclick, text) {
    return button(
        {
            className: 'pv1 ba b--dark-green ph3 bg-green grow pointer f3 white',
            type: 'button',
            onclick
        },
        [i({
            className: 'fa fa-plus mr2'
        }),
            text]
    )
}

function view(dispatch, model) {
    return div({ className: 'w-70 center sans-serif' }, [
        h1({ className: 'f1 bb' }, 'Flashcard study'),
        displayCreateButton(e => dispatch(showFormMsg(true)), 'Add Flashcard'),
        displayForm(dispatch, model),
        displayFlashCards(dispatch, model),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;