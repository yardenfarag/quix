import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './views/HomePage';
import WapList from './views/WapList';
import WapEdit from './views/WapEdit';
import WapPreview from './views/WapPreview';

function App() {
  return (
    <Router>
      <section className="App">

        <Routes>
          <Route path='/website/:id/edit' element={<WapEdit />} />
          <Route path='/website/:id' element={<WapPreview />} />
          <Route path='/website' element={<WapList />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
