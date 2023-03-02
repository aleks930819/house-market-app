import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import React, { Suspense, lazy } from 'react';

import ScrollToTop from './utils/scrollToTop';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import StarterScreen from './screens/StarterScreen';

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
const Booking = lazy(() => import('./screens/Booking'));
const NotFound = lazy(() => import('./screens/404'));
const BookedListings = lazy(() => import('./screens/BookedListings'));
const Watchlist = lazy(() => import('./screens/WatchList'));
const Subscription = lazy(() => import('./screens/Subscription'));

function App() {
  return (
    <>
      <ToastContainer />

      <Navbar />
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
          <Route
            path="/admin"
            element={
              <PrivateRoute admin>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/subscription" element={<Subscription />} />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <BookedListings />
              </PrivateRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
