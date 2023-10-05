import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { GET_ALL_USERS_REQEST } from './redux/TypesForActions/typesForActions';

import { useAppSelector } from './redux/store';

function App() {

  const dispatch = useDispatch();
  const users = useAppSelector(state => state.users.users)

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS_REQEST })
  }, []);


  return (
    <div className="App">
      Hello gay
      {users.map((u) => {
        return (
          <div key={u._id}> {u.username} </div>
        )
      })}
    </div>
  );
}

export default App;
