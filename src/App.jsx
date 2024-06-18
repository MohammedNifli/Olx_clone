import { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import ProductSell from './components/ProductSell.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import { FirebaseContext } from "./store/context.jsx";
import app, { auth } from "./firebase/config.jsx"; // Ensure auth is imported
import { PostContext } from './store/PostContext.jsx';
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <FirebaseContext.Provider value={app}>
      <UserContext.Provider value={{ user, setUser }}>
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
          <Router>
            <Header />
            <div>
              <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/productSell' element={<ProductSell />} />
               
                <Route path='/productDetail' element={<ProductDetail />} />
                

              </Routes>
            </div>
            <Footer />
          </Router>
        </PostContext.Provider>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
