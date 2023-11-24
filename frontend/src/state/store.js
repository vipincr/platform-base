import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

// Combining different reducers
const rootReducer = combineReducers({
    auth: authReducer,
    // Additional reducers can be added here as the application grows
});

// For Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)  // Applying thunk middleware for async actions
    )
);

export default store;
