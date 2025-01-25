import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Simple CSS Spinner
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 w-12 h-12"></div>
  </div>
);

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to show spinner

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setBlogs(response.data.blogs); 
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);  // Ensure loading is false even if an error occurs
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold">Blog Platform</a>
          <div className="space-x-4">
            <a href="/" className="text-white text-lg">Home</a>
            <a href="/blogform" className="text-white text-lg">Create Blog</a>
          </div>
          <form className="flex items-center">
            <input 
              type="search" 
              placeholder="Search blogs" 
              className="p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </form>
        </div>
      </nav>

      {/* Blog List */}
      <div className="mt-8">
        <h1 className="text-3xl font-semibold mb-6">Latest Blogs</h1>
        
        {/* Show spinner when loading */}
        {loading ? (
          <Spinner />
        ) : (
          <ul className="space-y-6">
            {Array.isArray(filteredBlogs) && filteredBlogs.map((blog, index) => (
              <li key={index} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.content}</p>
                {blog.blogtype === "video" && <video src={blog.coverimgUrl} controls className="w-full rounded-lg" />}
                {blog.blogtype === "image" && <img src={blog.coverimgUrl} alt={blog.title} className="w-full rounded-lg" />}
                <p className="text-gray-600 mt-2">Created by: {blog.createdBy}</p>
                <p className="text-gray-500 text-sm">{new Date(blog.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
