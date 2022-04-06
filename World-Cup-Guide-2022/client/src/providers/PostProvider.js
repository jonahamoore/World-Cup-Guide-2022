import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const GetAllPosts = () => {
    return fetch("https://localhost:44311/api/Post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("https://localhost:44311/api/Post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(GetAllPosts);
  };

  const GetPostsById = (id) => {
    return fetch(`https://localhost:44311/api/Post/${id}`)
      .then((res) => res.json())
  }

  const deletePost = (postId) => {
    return fetch(`https://localhost:44311/api/Post/${postId}`, {
        method: "DELETE"
    })
};


  return (
    <PostContext.Provider value={{ posts, GetAllPosts, addPost, GetPostsById, deletePost}}>
      {props.children}
    </PostContext.Provider>
  );
};