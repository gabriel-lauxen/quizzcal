import './App.css';
import { useState, } from 'react';
import StartingPage from './components/StartingPage';
import Quiz from './components/Quiz';

function App() {
  const [started,setStarted] = useState(false)

  function startGame() {
    setStarted(true)
  }


  return (
    <div className="App">
      <img className={`background-blob-yellow ${started ? 'translate-bottom-left' : ''}`} src='/assets/blobs.svg' alt="background blob2"/>
      <img className={`background-blob-blue ${started ? 'translate-top-right' : ''}`} src='/assets/blob.svg' alt="background blob"/>
      { !started ? 
        <StartingPage startGame={startGame}/> :
        <Quiz/>
      }

    </div>
  );
}

export default App;
