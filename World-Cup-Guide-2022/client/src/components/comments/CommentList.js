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

     return (
       
        <div className="container">
          <div className="row justify-content-center">

          <Button color="gold" margin="small" pad="small" label="Send chat Message" outline id="addComment" onClick={() => {navigate("/comments/add")}}></Button> {' '}
      
              {comments.map((singleCommentInLoop) => (
                <Comment key={singleCommentInLoop.id} comment={singleCommentInLoop} />
              ))}
    
            </div>
          </div>  
    );
}