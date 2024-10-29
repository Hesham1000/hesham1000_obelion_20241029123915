import React from 'react';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import { BrowserRouter } from 'react-router-dom';

// import Profile from './components/Profile';
// import Venue from './components/Venue';
// import Vendor from './components/Vendor';
// import EventManagement from './components/EventManagement';
// import Payment from './components/Payment';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Event Management App</h1>
      </header>
      <main>
      <BrowserRouter>
        <Register />
        <Login />
      </BrowserRouter>

        {/* <Profile /> */}
        {/* <Venue /> */}
        {/* <Vendor /> */}
        {/* <EventManagement /> */}
        {/* <Payment /> */}
      </main>
    </div>
  );
};

export default App;
