import './App.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
