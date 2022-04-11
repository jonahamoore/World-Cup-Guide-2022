import React, {useContext, useEffect, useState} from "react"
import { PostContext } from "../../providers/PostProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../posts/PostCard";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardGroup, CardImg, Form, FormGroup, Row, Col, Button, Label, Input  } from "reactstrap";

export const PostForm = () => {
    const {GetPostsById, addPost, editPost} = useContext(PostContext)

    const [post, setPost] = useState({
        title: "",
        content: "",
        imageUrl:"",
        userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,
    });

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const {postId} = useParams();

    const handleControlledInputChange = (event)=> {
        const newPost = {...post}
        newPost[event.target.id] = event.target.value       
        setPost(newPost)
    }

    const handleSavePost = (event) => {
        if(post.title === "" || post.imageUrl ==="" )
        {
            alert("Please fill out the title and/or image url fields.")
        }  else {
          setIsLoading(true);
          if (postId){
              editPost({
                  userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  imageUrl: post.imageUrl,
              })
              .then(() => navigate(`/posts/detail/${post.id}`))
          } else {
          addPost({
              userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,
              title: post.title,
              content: post.content,
              imageUrl: post.imageUrl
          })
          .then(navigate("/Posts"));
          }
      }
    }

    useEffect(()=> {
      if(postId){
          GetPostsById(postId)
          .then(post => {
            setPost(post)
            setIsLoading(false)
          })
        } else {
          setIsLoading (false)
        }}, [])


    return(
    <Form>
  <FormGroup>
    <Label for="titleOfPost">
      Title
    </Label>
    <Input
      id="title"
      name="postTitle"
      onChange={handleControlledInputChange}
      value={post.title}
    />
  </FormGroup>
  <FormGroup>
    <Label for="contentOfPost">
      Content
    </Label>
    <Input
      id="content"
      name="postContent"
      value={post.content}
      placeholder="let the people know"
      onChange={handleControlledInputChange}
    />
  </FormGroup>
  <Row form>
    <Col md={6}>
      <FormGroup>
        <Label for="pictureForPost">
          Link to image: 
        </Label>
        <Input
          id="imageUrl"
          name="postImageUrl"
          onChange={handleControlledInputChange}
          value={post.imageUrl}
        />
      </FormGroup>
    </Col>
  </Row>
 
  <Button primary disabled={isLoading} type="submit" className="btn btn-primary" onClick={event => {event.preventDefault()
  handleSavePost()}}>{postId ? <>Save Post</> : <>Add Post</>}
  </Button>
  <Button outline onClick={() => navigate("/Posts")}>Back to List
  </Button>
  </Form>
    )}