import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './views/HomePage';
import WapList from './views/WapList';
import WapEdit from './views/WapEdit';
import WapPreview from './views/WapPreview';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
    <section className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Routes>
      <Route path='/website/:id/edit' element={ <WapEdit />}/>
      <Route path='/website/:id' element={ <WapPreview />}/>
      <Route path='/website' element={ <WapList />}/>
      <Route path='/' element={ <HomePage />}/>
      </Routes>
    </section>
    </Router>
  );
}

export default App;
