import { useDispatch } from 'react-redux';
import './App.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { FETCH_NEW_USER, GET_ALL_USERS_REQEST } from './redux/TypesForActions/typesForActions';

import { useAppSelector } from './redux/store';

function App() {

  const dispatch = useDispatch();
  const users = useAppSelector(state => state.users.users)
  const status = useAppSelector(state => state.app.status)

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS_REQEST })
  }, []);

  const [username, setUsername] = useState<string>('')

  const addNewUserOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.currentTarget.value
    setUsername(username)
  }
  const addNewUserHandler = (username: string) => {
    dispatch({ type: FETCH_NEW_USER, username })
    setUsername('')
  }
  console.log(status)
  return (
    <div className="App">
      <div>
        <input onChange={(e) => addNewUserOnChange(e)} value={username} />
        <button disabled={status === 'loading'} onClick={() => addNewUserHandler(username)}>create new user</button>
      </div>
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
