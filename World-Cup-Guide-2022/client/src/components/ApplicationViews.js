import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PostProvider } from "../providers/PostProvider";
import Login from "./Login";
import Register from "./Register";
import { PostList } from "./posts/PostList";
import { PostForm } from "./posts/PostForm";
import {UserProfileContext, UserProfileProvider,} from "../providers/UserProfileProvider";
import { PostDetails } from "./posts/PostDetails";
import {UserList} from "./users/UserList";
import  {UserDetails}  from "./users/UserDetail";

export const ApplicationViews = () => {

  const { isLoggedIn } = useContext(UserProfileContext);

  if (!isLoggedIn) {
    return (  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />      
      </Routes> 
    );
  }
  else{
  return (
  <UserProfileProvider>
    <PostProvider>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />       
        <Route path="/posts" element= {<PostList />} />
        <Route path="/posts/add" element={<PostForm />} />
        <Route path="/posts/edit/:postId/*" element={<PostForm />} />
        <Route path="posts/detail/:postId/*" element={<PostDetails />} />
      </Routes>
    </PostProvider>
  </UserProfileProvider>
  );
  };
}
