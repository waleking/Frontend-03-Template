// useEffect allows to mimic some of the lifecycle methods within a class-based component. 
// What we want is to fire off the request to get the posts when component mounts. 
import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // ? 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();// NOTE: cannot use keyword 'await' outside an async function.
  }, []); // why leave a blank square brackets here? 

  console.log(posts); // why it's printed several times when refreshing the webpage? 

  return (
    <div className="container">
      <h1>My App</h1>
    </div>
  );
};

export default App;
