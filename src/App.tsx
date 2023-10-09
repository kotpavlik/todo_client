import { useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { FETCH_NEW_USER, GET_ALL_USERS_REQEST } from './redux/TypesForActions/typesForActions';
import style from './App.module.scss'
import { useAppSelector } from './redux/store';
import { ErrorSnackbar } from './common/errorSnackBar/errorSnackBar';
import { Loading } from './common/lottieAnimation/loading';
import { Users } from './components/users/Users';

function App() {

  const dispatch = useDispatch();
  const status = useAppSelector(state => state.app.status)

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS_REQEST })
  }, []);

  if (status === 'loading') {
    return (
      <Loading />
    )
  }


  return (
    <>
      <ErrorSnackbar />
      <div className={style.app}>
        <Users />

      </div>
    </>

  );
}

export default App;
