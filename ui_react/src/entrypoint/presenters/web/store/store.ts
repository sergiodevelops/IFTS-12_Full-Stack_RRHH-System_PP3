import { createStore/*,applyMiddleware*/ } from 'redux';
// import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from "@entrypoint/presenters/web/redux/reducers/allReducers";

const persistedState = {};

const store = createStore(
    allReducers,
    persistedState,
    composeWithDevTools(
        // applyMiddleware(logger)
    )
);

export default store;
