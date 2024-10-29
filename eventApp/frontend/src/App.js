import React from 'react';
import Authentication from './components/Authentication';
import Profile from './components/Profile';
import Venue from './components/Venue';
import Vendor from './components/Vendor';
import EventManagement from './components/EventManagement';
import Payment from './components/Payment';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Event Management App</h1>
      </header>
      <main>
        <Authentication />
        <Profile />
        <Venue />
        <Vendor />
        <EventManagement />
        <Payment />
      </main>
    </div>
  );
};

export default App;
