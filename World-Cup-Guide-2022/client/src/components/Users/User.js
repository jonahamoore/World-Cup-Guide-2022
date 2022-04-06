import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Card className="m-4">      
      <CardBody>
        <Link to={`/users/${user.id}`}><strong>{user.Email}</strong></Link>
      <p><b>Display Name:</b> {user.DisplayName}</p>
      <p><b>User Type:</b> {user.UserType.name}</p>
      </CardBody>
    </Card>
  );
};

export default User;