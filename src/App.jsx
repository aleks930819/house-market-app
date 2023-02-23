import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import React, { Suspense, lazy } from 'react';

import ScrollToTop from './utils/scrollToTop';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

import StarterScreen from './screens/StarterScreen';
import NotFound from './screens/404';
// import SearchResult from './screens/SearchResult';
// import ItemDetails from './components/ItemDetails';
// import Profile from './screens/Profile';
// import ForgotPassword from './screens/ForgotPassword';
// import SignUp from './screens/SignUp';
// import Explore from './screens/Explore';
// import SignIn from './screens/SignIn';
// import Category from './screens/Category';
// import Offers from './screens/Offers';
// import Messages from './screens/Messages';
// import MessagesDetails from './screens/MessagesDetails';
// import ContactUs from './screens/ContactUs';
// import PrivacyPolicy from './screens/PrivacyPolicy';
// import EditProperties from './screens/EditProperties';
// import Admin from './screens/Admin';
// import EditProfile from './screens/EditProfile';
// import Host from './screens/Host';

import Spinner from './components/Spinner';

const Admin = lazy(() => import('./screens/Admin'));
const EditProfile = lazy(() => import('./screens/EditProfile'));
const EditProperties = lazy(() => import('./screens/EditProperties'));
const ContactUs = lazy(() => import('./screens/ContactUs'));
const Messages = lazy(() => import('./screens/Messages'));
const MessagesDetails = lazy(() => import('./screens/MessagesDetails'));
const Offers = lazy(() => import('./screens/Offers'));
const Host = lazy(() => import('./screens/Host'));
const Category = lazy(() => import('./screens/Category'));
const Explore = lazy(() => import('./screens/Explore'));
const SignUp = lazy(() => import('./screens/SignUp'));
const SignIn = lazy(() => import('./screens/SignIn'));
const ForgotPassword = lazy(() => import('./screens/ForgotPassword'));
const Profile = lazy(() => import('./screens/Profile'));
const ItemDetails = lazy(() => import('./components/ItemDetails'));
const SearchResult = lazy(() => import('./screens/SearchResult'));


function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<StarterScreen />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/offers" element={<Offers />} />

          <Route
            path="/host"
            element={
              <PrivateRoute>
                <Host />
              </PrivateRoute>
            }
          />

          <Route path="/details/:id" element={<ItemDetails />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route
            path="/edit-profile/:id"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-properties/:id"
            element={
              <PrivateRoute>
                <EditProperties />
              </PrivateRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />

          <Route
            path="/messages/:id"
            element={
              <PrivateRoute>
                <MessagesDetails />
              </PrivateRoute>
            }
          />

          <Route path="/search" element={<SearchResult />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
