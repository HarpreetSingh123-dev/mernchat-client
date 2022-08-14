import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Features/userSlice'
import appApi from './Sevices/appApi'
//THIS FILE HAS ALL PERSIST STORE CONFIGURATION OF REDUX

//for persisting our state 
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {persistReducer}  from 'redux-persist'

import thunk from 'redux-thunk'


// reducers
const reducer = combineReducers({

    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
})


const persistConfig = {

    key:'root',
    storage,
    blackList:['appApi']
}

// persisting our store
const persistedReducer = persistReducer( persistConfig , reducer )

const store = configureStore({

    reducer:persistedReducer,
    middleware:[ appApi.middleware , thunk ]
})

export default store