import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { rootSaga } from "./rootSaga/rootSaga";
import { usersReducer } from "./todo/userReducer/userReducer";
import { appReducer } from "./todo/appReducer/appReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// add all reducers into rootReducers with used combineReducers
const rootReducers = combineReducers({
    app: appReducer,
    users: usersReducer
}
)
// Mount it on the Store
export const store = createStore(rootReducers, applyMiddleware(sagaMiddleware, logger));

// Run the saga
sagaMiddleware.run(rootSaga);

// App state types
export type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch() as AppDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


// @ts-ignore
window.store = store