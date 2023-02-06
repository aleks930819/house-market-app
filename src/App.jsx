import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './utils/scrollToTop';

import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import StarterScreen from './screens/StarterScreen';
import ForgotPassword from './screens/ForgotPassword';
import Explore from './screens/Explore';
import Category from './screens/Category';
import Offers from './screens/Offers';
import Host from './screens/Host';


function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<StarterScreen />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/host" element={<Host />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
