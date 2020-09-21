// useEffect allows to mimic some of the lifecycle methods within a class-based component. 
// What we want is to fire off the request to get the posts when component mounts. 
import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import './App.css';
import { Posts } from './components/Posts';
import { Pagination } from './components/Pagination';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // show the loading process, if we are waiting for the json data
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

  // Get current posts which range is [indexOfFirstPost, indexOfLastPost). NOTE: the 
  // indexOfLastPost may be beyond the scope of the array of posts, but the slice function
  // can handle this situation safely by returning the sub-array [indexOfFirstPost, len(posts))
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length}/>
    </div>
  );
};

export default App;
