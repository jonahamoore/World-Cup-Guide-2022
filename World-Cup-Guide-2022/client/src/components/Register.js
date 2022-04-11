import React, { useState, useContext } from "react";
import { Box, Card, CardBody, CardTitle, CardFooter, Heading, Button } from "grommet";
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(UserProfileContext);

  
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
     e.preventDefault();
      if (password && password !== confirmPassword) {
        alert("Passwords don't match. Do better.");
      } else {
        const userProfile = {displayName, email };
        register(userProfile, password)
          .then(() => navigate("/"));
      }
   
 };

  return (
    <main style={{ textAlign: "center" }}>

            <div className="registerForm">
            <Card width="large">
            <form className="form--login" onSubmit={registerClick}>
                <Heading className="brewReviewRegisterHeader">Please Register for Brew Review</Heading>
                <Box>
                <fieldset>
                  <label htmlFor="displayName">Display Name</label>
                  <input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                </fieldset>
                <fieldset>
                  <label for="email">Email</label>
                  <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label for="password">Password</label>
                    <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label for="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </fieldset>
                <fieldset>
                    <Button color="#704E33" margin={"small"} alignSelf="center" justify="center" type="submit"> Sign in </Button>
                </fieldset>
                </Box>
            </form>
            </Card>
            </div>
        </main>
  );
}

 // <Form onSubmit={registerClick}>
    //   <fieldset>
    //     <FormGroup>
    //       <Label htmlFor="displayName">Display Name</Label>
    //       <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="email">Email</Label>
    //       <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="password">Password</Label>
    //       <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="confirmPassword">Confirm Password</Label>
    //       <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
    //     </FormGroup>
    //     <FormGroup>
    //       <Button>Register</Button>
    //     </FormGroup>
    //   </fieldset>
    // </Form>