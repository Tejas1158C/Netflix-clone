import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getProfile } from './firebase.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from "./pages/Search/Search";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import NewPopular from "./pages/NewPopular/NewPopular";
import Profile from "./pages/Profile/Profile";
import MyList from "./pages/MyList/MyList";
import Onboarding from "./pages/Onboarding/Onboarding";
import Checkout from "./pages/Checkout/Checkout";



const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");

        // Fetch the user's Firestore profile to check for a plan
        const profile = await getProfile();

        // If they don't have a planName saved to their DB profile, they MUST onboard
        const needsOnboarding = !profile || !profile.planName;

        // Ensure they are routed to /onboarding if they haven't completed it
        if (needsOnboarding && window.location.pathname !== '/onboarding' && window.location.pathname !== '/checkout') {
          navigate("/onboarding");
        }
        // Ensure they go to home if they HAVE completed onboarding and are on login or onboarding pages
        else if (!needsOnboarding && (window.location.pathname === '/login' || window.location.pathname === '/onboarding')) {
          navigate("/");
        }

      } else {
        console.log("Logged Out");
        // Ensure logged out users are sent to login unless they are already there
        if (window.location.pathname !== '/login') {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <ToastContainer theme="dark" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/new" element={<NewPopular />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
