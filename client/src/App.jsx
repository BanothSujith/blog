import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import AdminPage from './components/pages/AdminPage';
import Register from './components/pages/Register';
import NotFound from './components/pages/NotFound';
import BlogForm from './components/pages/CreateBlog'

function App() {
  const token = Cookies.get('token');
  const user = Cookies.get('user');
  // console.log(token);
  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/adminpage" />} />
        <Route path="/logout" element={token ? <Logout /> : <Navigate to="/login" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/adminpage" />} />
        <Route path="/adminpage" element={token ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/blogform" element={token ? <BlogForm /> : <Navigate to="/login" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
