import React, { useState, createContext } from "react";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  const [comments, setComment] = useState([]);
  
  const GetAllComments = () => {
    return fetch("https://localhost:44311/api/Comment")
      .then((res) => res.json())
      .then(setComment);
  };

  const addComment = (comment) => {
    return fetch("https://localhost:44311/api/Comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
      }).then(GetAllComments);
  };

  const GetCommentById = (id) => {
    return fetch(`https://localhost:44311/api/Comment/${id}`)
      .then((res) => res.json())
  }

  const editComment = comment => {
    return fetch(`https://localhost:44311/api/Comment/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    }).then(GetAllComments)
  }

  const deleteComment = (commentId) => {
    return fetch(`https://localhost:44311/api/Comment/${commentId}`, {
        method: "DELETE"
    })
};


  return (
    <CommentContext.Provider value={{ comments, GetAllComments, GetCommentById, addComment, deleteComment, editComment }}>
      {props.children}
    </CommentContext.Provider>
  );
};