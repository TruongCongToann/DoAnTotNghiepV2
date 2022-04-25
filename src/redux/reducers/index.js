//tong hop cac reducers con lai

import { combineReducers } from "redux";
import loginedUser from './loginedUser'
import allCodeReducer from "./allCodeReducer";
import adminReducer from "./adminReducer";
import DoctorReducer from "./DoctorReducer";
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // 

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['loginedUser','doctor']
  }
// combineReducers de tong hop lai tat ca ca reducer 
const rootReducers = combineReducers({
    loginedUser: loginedUser,
    allCode:allCodeReducer,
    admin:adminReducer,
    doctor:DoctorReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers)

const  store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;

// export default rootReducers;