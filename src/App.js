
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './screens/Main';
import View from './screens/View';

function App() {
  return (
    <div >
      <HashRouter>
      <Routes>
      <Route path="/" element={<Main />} />
       <Route path="/view" element={<View />} /> 
     
      </Routes>
      </HashRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
