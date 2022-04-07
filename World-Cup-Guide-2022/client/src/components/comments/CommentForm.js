import React, {useContext, useEffect, useState} from "react"
import { CommentContext } from "../../providers/CommentProvider";
import { useNavigate, useParams } from "react-router-dom";
import { CommentCard } from "../comments/CommentCard";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardGroup, CardImg, Form, FormGroup, Row, Col, Button, Label, Input  } from "reactstrap"; 




export const CommentForm = () => {
    const {GetCommentById, addComment, editComment} = useContext(CommentContext)

    const [comment, setComment] = useState({
        message: "",
        userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,
    });

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const {commentId} = useParams();

    const handleControlledInputChange = (event)=> {
        const newComment = {...comment}
        newComment[event.target.id] = event.target.value       
        setComment(newComment)
    }

    const handleSaveComment = (event) => {
        if(comment.message === "")
        {
            alert("If you are going to say something, then say it already!")
        }  else {
          setIsLoading(true);
          if (commentId){
              editPost({
                  userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,                 
                  message: comment.message
              })
              .then(() => navigate(`/comment/detail/${comment.id}`))
          } else {
          addPost({
            userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,                 
            message: comment.message
          })
          .then(navigate("/Comment"));
          }
      }
    }

    useEffect(()=> {
      if(commentId){
          GetCommentById(commentId)
          .then(comment => {
            setComment(comment)
            setIsLoading(false)
          })
        } else {
          setIsLoading (false)
        }}, [])

        return(
            <section class="chat-form">
                <textarea type="textarea" id="chat-text" class="chat-text" placeholder="enter message.."></textarea>
                <button id="sendMessage" class="btn btn-primary">Send</button>
            </section>
        )


    }