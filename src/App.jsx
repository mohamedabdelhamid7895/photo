/* eslint-disable no-undef */

import { Routes, Route } from 'react-router-dom';
import SignIn from './components/Auth/signIn';
import SignUp from './components/Auth/signUp';
import Home from './components/Home/Home';
import Favorites from './components/Fav/fav';
import Navbar from './components/Home/navbar';
import ProtectedRoute from './components/protectedRoutes/protectedRoute';
import Footer from './components/Home/Footer';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

