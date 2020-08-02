import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SkillpendiumTheme } from './muiTheme';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <ThemeProvider theme={SkillpendiumTheme}>
          <CssBaseline/>
          <App />
        </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();