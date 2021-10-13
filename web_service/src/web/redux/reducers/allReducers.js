import { combineReducers } from 'redux';
import userReducers from "./userReducers";
import notificationReducers from "./notificationReducers";

export default combineReducers({
    userReducers: userReducers,
    notificationReducers: notificationReducers,
})
