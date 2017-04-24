import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { DevTools } from './utils/index';


function getMiddlewares() {
    const middleware = [
        thunk
    ];
    
    return applyMiddleware(...middleware);
}


export default function configureStore(initialState) {
    const store = compose(
        getMiddlewares(),
        DevTools.instrument()  
    )(createStore)(rootReducer, initialState);
    
    return store;
}
