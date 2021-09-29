import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';

function App(props) {

  const [user, setUser] = useState(props.user);
  console.log('App js:', user);

  const addUser = user => {
    setUser(user);
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={addUser}/>
      <Switch>
          {/* <ProtectedRoute 
            exact path='/my-tones'
            user={user}
            component={MyAudioFileListPage}
          /> */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" render={props => <Signup setUser={addUser} {...props} />} />
          <Route exact path="/login" render={props => <Login setUser={addUser} {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
