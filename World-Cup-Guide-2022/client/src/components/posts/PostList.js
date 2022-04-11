import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import {Button} from "grommet";
import { Post } from "./PostCard";
import { useNavigate } from "react-router-dom";

export const PostList = () => {
    const { posts, GetAllPosts } = useContext(PostContext);

    useEffect(() => {
        GetAllPosts();
      }, []);

      const navigate = useNavigate();

     return (
       
        <div className="container">
          <div className="row justify-content-center">

          <Button outline id="addPost" onClick={() => {navigate("/posts/add")}}>Add new post</Button> {' '}
      
              {posts.map((singlePostInLoop) => (
                <Post key={singlePostInLoop.id} post={singlePostInLoop} />
              ))}
    
            </div>
          </div>  
    );
}