import {h} from 'virtual-dom';
import hh from 'hyperscript-helpers';

const {div, pre, button, i, h1} = hh(h);

function displayFlashCards() {

}

function displayCreateButton(onclick, texts) {
    return button(
        {
            className: 'pv1 ph3 bg-green f3 white',
            type: 'button',
            onclick
        },
        texts
    )
}

function view (dispatch, model) {
    return div({className: 'w-70 center sans-serif'}, [
        h1({className: 'f1 bb'}, 'Flashcard study'),
        displayCreateButton(e=>console.log(this), [i({
            className: 'fa fa-plus mr2'
        }), 'Add Flashcard']),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;