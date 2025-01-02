import './App.css';
import './index.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="flex">
      <Sidebar onSelectType={setSelectedType} />
      <MainContent selectedType={selectedType} />
    </div>
  );
}

export default App;
