import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from '../../components/pages/Home';
import Login from '../../components/pages/Login';
import Logout from '../../components/pages/Logout';
import AdminPage from '../../components/pages/AdminPage';
import Register from '../../components/pages/Register';
import NotFound from '../../components/pages/NotFound';
import CreateVideoBlog from '../pages/CreateVideoBlog';
import CreateImgBlog from '../pages/CreateImgBlog';

function Routers() {
    const token = Cookies.get('token');
    // const user = Cookies.get('user');
    const isAuthenticated = Boolean(token)
  return (

    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/adminpage" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/adminpage" />} />

      <Route path="/adminpage" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
      <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/login" />} />
      <Route path="/blogvideo" element={isAuthenticated ? <CreateVideoBlog /> : <Navigate to="/login" />} />
      <Route path="/blogimg" element={isAuthenticated ? <CreateImgBlog /> : <Navigate to="/login" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Routers