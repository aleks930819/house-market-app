import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StarterScreen from './screens/StarterScreen';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StarterScreen />} />
      </Routes>
    </>
  );
}

export default App;
