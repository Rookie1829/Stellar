import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Dragons from './pages/Dragons';
import Capsules from './pages/Capsules';
import Crew from './pages/Crew';
import Launches from './pages/Launches';
import Payloads from './pages/Payloads';
import Roadster from './pages/Roadster';
import Rockets from './pages/Rockets';
import Ships from './pages/Ships';
import Starlink from './pages/Starlink';
import Company from './pages/Company';
import Planets from './pages/Planets';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/learn/dragons" element={<Dragons />} />
        <Route path="/learn/capsules" element={<Capsules />} />
        <Route path="/learn/crew" element={<Crew />} />
        <Route path="/learn/launches" element={<Launches />} />
        <Route path="/learn/payloads" element={<Payloads />} />
        <Route path="/learn/roadster" element={<Roadster />} />
        <Route path="/learn/rockets" element={<Rockets />} />
        <Route path="/learn/ships" element={<Ships />} />
        <Route path="/learn/starlink" element={<Starlink />} />
        <Route path="/learn/company" element={<Company />} />
        <Route path="/learn/planets" element={<Planets />} />
      </Routes>
    </Router>
  );
}

export default App;