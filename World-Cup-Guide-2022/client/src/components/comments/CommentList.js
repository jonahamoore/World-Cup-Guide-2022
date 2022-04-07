import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import {Button} from "grommet";
import { Comment } from "./CommentCard";
import { useNavigate } from "react-router-dom";

export const CommentList = () => {
    const { comments, GetAllComments } = useContext(CommentContext);

    useEffect(() => {
        GetAllComments();
      }, []);

      const navigate = useNavigate();

//if else statement to display each category seperately so they do not loop over each other
     return (
       
        <div className="container">
          <div className="row justify-content-center">

          <Button outline id="addComment" onClick={() => {navigate("/comments/add")}}>write a message</Button> {' '}
      
              {comments.map((singleCommentInLoop) => (
                <Comment key={singleCommentInLoop.id} comment={singleCommentInLoop} />
              ))}
    
            </div>
          </div>  
    );
}