import React, {useContext, useEffect, useState} from "react"
import { CommentContext } from "../../providers/CommentProvider";
import { useNavigate, useParams } from "react-router-dom";
import { CommentCard } from "../comments/CommentCard";
import { Button, Card, Box } from "grommet";




export const CommentForm = () => {
    const {GetCommentById, addComment, editComment, deleteComment } = useContext(CommentContext)

    const [comment, setComment] = useState({
        id: "",
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

    const handleSaveComment = () => {
        if(comment.message === "")
        {
            alert("If you are going to say something, then say it already!")
        }  else {
          setIsLoading(true);
          if (commentId){
              editComment({
                  id: comment.id,
                  userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,                 
                  message: comment.message
              })
              .then(() => navigate(`/comment/detail/${comment.id}`))
          } else {
          addComment({
            userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,                 
            message: comment.message
          })
          .then(navigate("/comment"));
          }
      }
    }

    const commentDelete = () => {
      deleteComment(comment.id)
          .then(() => {
              navigate("/comment")
          })
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
            <section className="chat-form">
            <div className="editCommentCard">
            <Box className="" margin="medium" align="center" direction="row" justify="center" pad="small">
              <Card margin="xsmall" width="small" justify="center" align="center" >
                <textarea type="textarea" onChange={handleControlledInputChange} id="message" className="chat-text" value={comment.message} placeholder="enter message.."></textarea>
                <Button  disabled={isLoading} alignself="center" margin="xsmall" label="Post Comment" type="submit" className="btn btn-primary" color="gold" onClick={event => {event.preventDefault()
                    handleSaveComment()}}>
                    </Button>
                    <Button color="gold" margin="xsmall"  label="Delete Comment" onClick={commentDelete}></Button>
                    <Button outline color="gold" label="Back to Comments" onClick={() => navigate("/Posts")}>
                    </Button>
              </Card>
            </Box>
              </div>
            </section>
        )


    }