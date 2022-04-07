import React, {useContext, useEffect, useState} from "react"
import { grommet, Box, Card, Button, Heading, Text, Paragraph, CardBody, CardImg, CardHeader } from "grommet";
import { Link } from "react-router-dom";
import "./WorldCup.css";

export const Comment = ({ comment, user }) => {


    if (comment.userProfileId === (JSON.parse(sessionStorage.getItem("userProfile")).id)) {

      // if (e.target.id.startsWith("editChat")) {
      //   const chatId = +e.target.id.split("-")[1]
      //   MessageEditForm(chatId);
      //   }}


          return (
            <>
        <section class="message-card">
          <div class="message-text"><b>{user.email}:</b> <em>{comment.message}</em></div>
          <button class="message-edit btn btn-primary">modify</button>
        </section>

          
    </>
    )} else {
      return (
        <section class="message-card">
          <div class="message-text"><b>${user.email}:</b> <em>{comment.message}</em></div>
        </section>
      )

    }


    



    
    



    

























