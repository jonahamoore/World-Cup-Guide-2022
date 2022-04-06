import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Card className="m-4">      
      <CardBody>
        <Link to={`/users/${user.id}`}></Link>
      <p><b>Display Name:</b> {user.displayName}</p>
      <p><b>Display Name:</b> {user.email}</p>
      </CardBody>
    </Card>
  );
};

export default User;