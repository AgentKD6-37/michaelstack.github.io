import { useState } from 'react';
import './App.css';
import StarMap from './StarMap';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative h-screen w-screen bg-space overflow-hidden">
      <StarMap />
    </div>
  );
}

export default App;
