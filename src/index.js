import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom'
import store from './ducks/store'
import {Provider} from 'react-redux'

ReactDOM.render(
<Provider store={store}>
    <HashRouter>
        <App />
    </HashRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
