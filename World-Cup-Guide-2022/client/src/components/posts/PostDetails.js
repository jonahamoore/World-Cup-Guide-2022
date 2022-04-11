import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider";
import { useParams, useNavigate } from "react-router-dom"
import {  Button, Box, Image, Card, CardBody, CardHeader, CardFooter } from "grommet"


export const PostDetails = () => {
    const { GetPostsById, deletePost } = useContext(PostContext)
  
      const [post, setPost] = useState({})
  
      const {postId} = useParams();

      const navigate = useNavigate();
      
      const postDelete = () => {
          deletePost(post.id)
              .then(() => {
                  navigate("/Posts")
              })
      }

      useEffect(() => {
        console.log("useEffect", postId)
        GetPostsById(postId)
        .then((response) => {
          setPost(response)
        })
        }, [])

        return (
          
        <section className="PostDetailsCard">
        <div align="center" margin="auto" className="detailsCard">
            <Card width="medium" pad="small" margin="small">
            <CardHeader>
              <h2 className="post_name">{post.title}</h2>
            </CardHeader>
            <CardBody>
              <div className="post_content"> Content: {post.content}</div>
              <div className="post_content"> Content: {post.imageUrl}</div>
            </CardBody>
              
                <Button color="#704E33" margin="xsmall" label="Delete Post" onClick={postDelete}></Button>
                <Button color="#704E33" margin="xsmall" label="Edit" onClick={() => {navigate(`/posts/edit/${post.id}`)}}></Button>
            </Card>
        </div>
        </section>
          )
        }
        