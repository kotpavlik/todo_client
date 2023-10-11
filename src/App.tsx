import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_ALL_USERS_REQEST } from './redux/TypesForActions/typesForActions';
import style from './App.module.scss'
import { useAppSelector } from './redux/store';
import { ErrorSnackbar } from './common/errorSnackBar/errorSnackBar';
import { Loading } from './common/lottieAnimation/loading';
import { Users } from './components/users/Users';
import background_image from '../src/assets/bg/11910.jpg'

function App() {

  const dispatch = useDispatch();
  const status = useAppSelector(state => state.app.status)

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS_REQEST })
  }, [dispatch]);


  return (
    <>
      <ErrorSnackbar />
      <div style={{ backgroundImage: `url(${background_image})` }} className={style.app}>
        {status === 'loading' ?
          <div className={style.loading}>
            <Loading />
          </div> : ''}
        <Users />
      </div>
    </>

  );
}

export default App;
