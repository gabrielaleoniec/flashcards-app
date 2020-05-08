import app from './App';
import update from './Update';
import view from './View';
import initModel from './Model';

const node = document.getElementById('app');

app(initModel, update, view, node);