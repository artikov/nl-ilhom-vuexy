import { combineReducers } from 'redux'
import { apiSlice } from './slices/apiSlice'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer
})

export default rootReducer
