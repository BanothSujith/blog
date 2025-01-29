import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HomeCard from '../../cards/HomeCard';
import SkeletonPage from './SkeltonHome';
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message,setMessage] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {

        const response = await axios.get('/api/blogs',{withCredentials: true,});
        const data = response.data.blogs;

        setBlogs(data);
        setFilteredBlogs(data); 
        setLoading(false);
      } catch (error) {
        setMessage(error.response.data.error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="  w-full h-full overflow-hidden ">
    
      {loading ? (
        <div className="w-full h-full ">
       <SkeletonPage/>
        </div>
      ) : (
        <div className=" flex gap-x-5 gap-y-8 flex-wrap  h-full w-full overflow-auto hidescroolbar "> 
          {filteredBlogs.map((item) => (
            <div key={item._id} className="w-[32%]   ">
              <HomeCard item={item} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
