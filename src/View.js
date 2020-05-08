import {h} from 'virtual-dom';
import hh from 'hyperscript-helpers';

const {div, pre} = hh(h);

function view (dispatch, model) {
    return div([
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;