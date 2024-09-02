import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    UserName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            UserName: response.data.UserName,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ UserName: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navbar">
            <div className="nav-left">
              {!authState.status ? (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/registration" className="nav-link">Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link">Home Page</Link>
                  <Link to="/createpost" className="nav-link">Create a Post</Link>
                </>
              )}
            </div>
            <div className="nav-right">
              {authState.status && (
                <>
                  <h1>{authState.UserName}</h1>
                  <button onClick={logout}>Logout</button>
                </>
              )}
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
