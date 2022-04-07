import React, {useContext, useEffect, useState} from "react"
import { grommet, Box, Card, Button, Heading, Text, Paragraph, CardBody, CardImg, CardHeader } from "grommet";
import { Link } from "react-router-dom";
import "./WorldCup.css";

export const Post = ({ post }) => {

    if(JSON.parse(sessionStorage.getItem("userProfile")).id === '1'){
    }

  return (
    <div className="PostCard">
        <Box className="postNameTitle" margin="medium" align="center" direction="row" justify="center" pad="small">
            <Card background="" width="large" height="450px"
                border={{color: '#F5EED5', size: 'medium'}} pad="small">
                <CardHeader align="center" justify="center" className="post-review"><Link to={`/posts/detail/${post.id}`}><h2>{post.title}</h2>
                    </Link></CardHeader>
            <Box margin="small">
                <div className="postContent">{post.content}</div>
                <div className="actorPics"><img src={post.imageUrl} alt="soccer players"  height="250px"/></div>
            </Box>
            </Card>
        </Box>
    </div>
    )}