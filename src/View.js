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

const { div, pre, button, i, h1, label, textarea, a } = hh(h);

function displayAnswear(dispatch, flashcard) {
    const dButton = displayButton.bind(null, dispatch);
    const chRank = changeFlashcardRankMsg.bind(null, flashcard.id);
    if (!flashcard.show_answear) {
        return a({
            className: 'underline pointer',
            onclick: e => dispatch(changeFlashcardDisplayMsg(flashcard.id))
        }, 'Show answear');
    }

    return div(
        [
            flashcard.edit_mode?'':a({
                className: 'underline pointer',
                onclick: e => dispatch(changeFlashcardDisplayMsg(flashcard.id))
            }, 'Hide answear'),
            div({ className: 'mv2 f3 w-100' },
                flashcard.edit_mode?textarea({className: 'w-100'}, flashcard.answear):flashcard.answear),
            flashcard.edit_mode?
            dButton('gray', 'Save', showFormMsg(true)):
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
        return textarea({className: 'w-100'}, flashcard.question);
    }
    return div(
        {className: ''},
        [
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
            a('Question'),
            div(
                {
                    className: 'mv2 f3 w-100'
                },
                displayQuestion(dispatch, flashcard),
            ),
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
        displayButton(dispatch, 'moon-gray', 'Save', saveFormMsg),
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