import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <Sidebar toggle={toggle} isOpen={isOpen} />
      <Navbar toggle={toggle} />
    </div>
  );
}

export default App;
