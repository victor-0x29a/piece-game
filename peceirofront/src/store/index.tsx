import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './Reducer'


export const store = configureStore({
    reducer: appReducer,
    devTools: true
})