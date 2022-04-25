import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from './redux/reducers/index'
import store from './redux/reducers/index'

//tao object store
// const store = createStore(rootReducers, composeWithDevTools());
// const store = createStore(
//   rootReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
// )
ReactDOM.render(
  
  <Provider store ={store}>
  
  <PersistGate loading={null} persistor={persistor}>

           <App/>
      </PersistGate>
        
  </Provider>
  ,
  document.getElementById('root')
);

