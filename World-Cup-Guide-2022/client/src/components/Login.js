import React, { useState, useContext } from "react";
// import { Button, Form, FormGroup, Label, Input, CardBody, Card, Container, Row, CardHeader, CardFooter, Col, Jumbotron, CardTitle } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Box, Card, CardBody, CardTitle, CardFooter, Heading, Button } from "grommet";



export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      navigate("/posts")
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <main className="container--login">

            <Box align="center" justify="center" direction="column" fill="horizontal" flex pad="large" margin="large" >
            <Card align="center" justify="center">
            <CardBody align="center" justify="center">
                <form className="form--login" onSubmit={loginSubmit}>
                    <Box background="url()" align="center" justify="center" pad="small" margin="medium" >
                    <Heading align="center" margin="xxsmall" textAlign="center" justify="center">Welcome</Heading>

                    <h2 align="center" className="pleaseSignIn">Please sign in</h2>
                    
                    <fieldset className="emailAddressBox">
                        <label for="email">Email: </label>
                        <input id="email" type="text" label='Email' onChange={e => setEmail(e.target.value)}/>
                    </fieldset>
                    <fieldset>
                        <label for="password">Password</label>
                        <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </fieldset>
                    <fieldset className="SignIn">
                        <Button className="signInButton" color="#481D24"  label="Sign In" type="submit" align="center" justify="center"/>
                    </fieldset>
                    </Box>
                </form>
            </CardBody>
            
            <CardFooter textAlign="center">
            
                <Link to="/register"><h3>Not Registered?</h3></Link>
            
            </CardFooter>
            </Card>
            </Box>
        </main>
  );
}