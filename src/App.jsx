import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import StarterScreen from './screens/StarterScreen';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StarterScreen />} />

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
