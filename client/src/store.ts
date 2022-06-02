import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducer/rootReducer'
import rootSaga from './redux/saga/rootSaga'
import { createLogger } from 'redux-logger'
const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(applyMiddleware(saga, createLogger())))

saga.run(rootSaga);

export default store;