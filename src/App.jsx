import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import StarterScreen from './screens/StarterScreen';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StarterScreen />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
