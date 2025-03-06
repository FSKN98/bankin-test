import React from 'react';
import Header from './components/Header';
import Comptes from './components/Comptes';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Comptes />
      <Footer />
    </div>
  );
}

export default App;
