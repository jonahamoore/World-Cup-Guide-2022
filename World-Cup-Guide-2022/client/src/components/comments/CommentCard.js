import React, {useContext, useEffect, useState} from "react"
import { grommet, Box, Card, Button, Heading, Text, Paragraph, CardBody, CardImg, CardHeader } from "grommet";
import { Link } from "react-router-dom";
import { Badge } from "bootstrap";
import { useNavigate } from "react-router-dom";

// if (commentProp.userProfileId === (JSON.parse(sessionStorage.getItem("userProfile")).id)) 

export const Comment = ({ comment }) => {

    
      return (
        
        <Card className="messageCard" >
        <Box height="auto" width='40%' margin="xsmall"  align="center" direction="row" justify="center" pad="xsmall" alignContent="center" class="message-card">        
        <div class="message-text"><b>{comment.userProfile?.displayName}:</b><Link to={`/comments/edit/${comment.id}`}> <em>{comment.message}</em></Link></div>
        </Box>
        </Card>
      )

    }