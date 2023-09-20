import './App.css';
import Header from './components/header';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './screens/account'; 
import Dating from './screens/dating';
import Forum from './screens/forumFiles/forum';
import Events from './screens/events';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/screens">
          <Route index element={<Account />} />
          <Route path="account" element={<Account />} />
          <Route path="dating" element={<Dating />} />
          <Route path="forum" element={<Forum />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>

    </Router>
    
  );
}

export default App;
