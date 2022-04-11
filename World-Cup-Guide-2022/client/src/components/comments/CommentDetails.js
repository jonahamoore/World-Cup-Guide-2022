import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "../../providers/CommentProvider";
import { useParams, useNavigate } from "react-router-dom"
import {  Button, Box, Image, Card, CardBody, CardHeader, CardFooter } from "grommet"


export const CommentDetails = () => {
    const { GetCommentsById, deleteComment } = useContext(CommentContext)
  
      const [comment, setComment] = useState({})
  
      const {commentId} = useParams();

      const navigate = useNavigate();
      
      const commentDelete = () => {
          deleteComment(comment.id)
              .then(() => {
                  navigate("/Comments")
              })
      }

      useEffect(() => {
        console.log("useEffect", commentId)
        GetCommentsById(commentId)
        .then((response) => {
          setComment(response).then(navigate(`/posts`))
        })
        }, [])

        return (
          
        <section className="CommentDetailsCard">
        <div className="commentsCard">
            <Card width="medium" pad="small" margin="small">
            <CardHeader>
              <h2 className="comment_name"></h2>
            </CardHeader>
            <CardBody>
              <div className="comment_message"> Message: {comment.message}</div>
            </CardBody>
              
                <Button color="#704E33" margin="xsmall" label="Delete Post" onClick={commentDelete}></Button>
                <Button color="#704E33" margin="xsmall" label="Edit" onClick={() => {navigate(`/comments/edit/${comment.id}`)}}></Button>
            </Card>
        </div>
        </section>
          )
        }