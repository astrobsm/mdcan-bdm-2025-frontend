import React, { useState } from 'react';
import Banner from './components/Banner';
import Countdown from './components/Countdown';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import Registration from './components/Registration';
import Delegate from './components/Delegate';
import AdminParticipants from './components/AdminParticipants';
import './App.css';

function App() {
  const [page, setPage] = useState('welcome');
  const [delegateEnabled, setDelegateEnabled] = useState(false);

  const handleRegistered = () => {
    setDelegateEnabled(true);
    setPage('delegate');
  };

  const handleAdminAccess = () => {
    const pwd = window.prompt('Enter admin password:');
    if (pwd === 'mdcan_db2025') {
      setPage('admin');
    } else if (pwd !== null) {
      window.alert('Incorrect password!');
    }
  };

  return (
    <div>
      <Banner />
      <div className="countdown-container"><Countdown /></div>
      <Navigation onNav={setPage} delegateEnabled={delegateEnabled} />
      {page === 'welcome' && <Welcome onRegister={() => setPage('registration')} onAdmin={handleAdminAccess} />}
      {page === 'registration' && <Registration onRegistered={handleRegistered} />}
      {page === 'delegate' && <Delegate />}
      {page === 'admin' && <AdminParticipants />}
    </div>
  );
}

export default App;
