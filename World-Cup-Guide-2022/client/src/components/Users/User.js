import React from "react";
import { Card, CardBody } from "grommet";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Card className="m-4">      
      <CardBody background="#" margin='small'>
        <Link to={`/users/${user.id}`}><strong>{user.Email}</strong></Link>
        <ul className="users">
          <li>Email: {user.email}</li>
          <li>Username: {user.displayName}</li>
          <li>{user.userType.name}</li>
        </ul>
      </CardBody>
    </Card>
  );
};

export default User;