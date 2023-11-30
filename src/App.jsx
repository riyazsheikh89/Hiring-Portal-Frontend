import AppBar from './components/AppBar';
import Home from './components/Home';
import Signup from './components/Signup';
import CandidateList from './components/CandidateList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateDetails from './components/CandidateDetails';
import Candidate from './components/Candidate';

function App() {
  

  return (
    <Router>
      {/* appbar component will always be rendered at top  */}
      <AppBar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/candidate" element={<Candidate/>} />
        <Route path="/candidate-list" element={<CandidateList/>} />
        <Route path="/candidate/:id" element={<CandidateDetails/>} />
      </Routes>
        
    </Router>
  );
}

export default App;