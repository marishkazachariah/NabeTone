import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AudioFilesPage from './pages/AudioFilesPage';
import AddAudioFile from './components/AddAudioFile';
import ProtectedRoute from './components/ProtectedRoute';
import AudioDetailsPage from './pages/AudioDetailsPage';
import UserAudioFilesPage from './pages/UserAudioFilesPage';
import MapboxPage from './pages/MapboxPage';
import EditAudioFilePage from './pages/EditAudioFilePage';

function App(props) {

  const [user, setUser] = useState(props.user);
  // console.log('App js:', user);

  const addUser = user => {
    setUser(user);
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={addUser}/>
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" render={props => <Signup setUser={addUser} {...props} />} />
          <Route exact path="/login" render={props => <Login setUser={addUser} {...props} />} />
          <ProtectedRoute exact path="/tones" user={user} component={AudioFilesPage} />
          <Route exact path="/my-tones" render={props => <UserAudioFilesPage setUser={addUser} {...props} user={user} />} />
          <Route exact path='/tones/add' component={AddAudioFile} />
          <Route exact path="/tones/:id" component={AudioDetailsPage} />
          <Route exact path="/tones/edit/:id" component={EditAudioFilePage} />
          <Route exact path="/map" component={MapboxPage} />
      </Switch>
      <footer>
        <p>Designed and built by Marishka Zachariah for Ironhack Berlin 2021</p>
      </footer>
    </div>
  );
}

export default App;
