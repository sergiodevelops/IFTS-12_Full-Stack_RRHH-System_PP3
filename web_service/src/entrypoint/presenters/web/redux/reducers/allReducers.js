import { combineReducers } from 'redux';
import userReducers from "../reducers/userReducers";
import notificationReducers from "../reducers/notificationReducers";


export default combineReducers({
    userReducers: userReducers,
    notificationReducers: notificationReducers,
})
