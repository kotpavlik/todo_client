import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { GET_ALL_USERS_REQEST } from './redux/TypesForActions/typesForActions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS_REQEST })
  }, []);


  return (
    <div className="App">
      Hello gay
    </div>
  );
}

export default App;
