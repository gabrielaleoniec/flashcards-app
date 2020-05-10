import {h} from 'virtual-dom';
import hh from 'hyperscript-helpers';

import {showFormMsg, questionInputMsg, answerInputMsg} from './Update';

const {div, pre, button, i, h1, label, textarea} = hh(h);

function displayFlashCards(dispatch, model) {

}

function displayLabel(labelText, value, oninput) {
    return label({className: 'db w-100 mv2'}, [
        labelText,
        textarea({
            className: 'pv1 ph2 w-100 mv1',
            value,
            oninput
        })
    ])
}

function displayForm(dispatch, model) {
    if(!model.show_form) {
        return null;
    }
    return div({className: 'ba bg-yellow mw6 mv3 ph3 pv2 shadow-5'}, [
        i({
            className: 'fa fa-close fa-2x fr grow pointer',
            onclick: e => dispatch(showFormMsg(false))
        }),
        displayLabel('Question', model.question, e => dispatch(questionInputMsg(e.target.value))),
        displayLabel('Answer', model.answer, e => dispatch(answerInputMsg(e.target.value))),
        button({
            className: 'ba b--gray pv1 ph3 bg-moon-gray grow pointer f4 white',
            type: 'button',
            onclick: e => dispatch(saveFormMsg())
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

function view (dispatch, model) {
    return div({className: 'w-70 center sans-serif'}, [
        h1({className: 'f1 bb'}, 'Flashcard study'),
        displayCreateButton(e=>dispatch(showFormMsg(true)), 'Add Flashcard'),
        displayForm(dispatch, model),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;