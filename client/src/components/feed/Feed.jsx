// Feed is basically to display all posts
import { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
// import { Posts } from "../../dummyData";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? // get user own post if not following anyone
          await axios.get("/posts/profile/" + username)
        : // or get all friend's post and own post
          await axios.get("/posts/timeline/" + user._id);
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((eachPost) => (
          <Post key={eachPost.id} post={eachPost} />
        ))}
      </div>
    </div>
  );
}
