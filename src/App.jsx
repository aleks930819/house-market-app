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
import ItemDetails from './components/ItemDetails';
import NotFound from './screens/404';
import EditProfile from './screens/EditProfile';
import EditProperties from './screens/EditProperties';
import Booking from './screens/Booking';
import Messages from './screens/Messages';
import MessagesDetails from './screens/MessagesDetails';

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

        <Route path="/details/:id" element={<ItemDetails />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/edit-profile/:id" element={<EditProfile />} />

        <Route path="/edit/:id" element={<EditProfile />} />

        <Route path="/edit-properties/:id" element={<EditProperties />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/messages/:id" element={<MessagesDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
