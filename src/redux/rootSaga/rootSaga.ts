import { all } from 'redux-saga/effects';
import { watchInitialize } from '../todo/appReducer/appReducer';
import { watchgetUsers } from '../todo/userReducer/userReducer';

export function* rootSaga() {
    yield all([watchInitialize(), watchgetUsers()]);
}