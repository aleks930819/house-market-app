import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import StarterScreen from './screens/StarterScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StarterScreen />} />
        {auth.currentUser ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
