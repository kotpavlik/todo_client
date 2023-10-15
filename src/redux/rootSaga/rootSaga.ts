import { all } from 'redux-saga/effects';
import { watchInitialize } from '../todo/appReducer/appReducer';
import { watchgetAddNewuser, watchRemoveUser, watchgetUsers } from '../todo/userReducer/userReducer';
import { watchAddDeskSaga, watchAllDesks, watchDeleteDesk } from '../todo/projectsReducer/ProjectReducer';

export function* rootSaga() {
    yield all([watchInitialize(), watchgetUsers(), watchgetAddNewuser(), watchRemoveUser(), watchAllDesks(), watchDeleteDesk(), watchAddDeskSaga()]);
} 