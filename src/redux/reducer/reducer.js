import globalReducer from "./globalReducer";
import homeReducer from "./homeReducer";
import { combineReducers } from 'redux'

export default combineReducers({globalReducer,homeReducer})