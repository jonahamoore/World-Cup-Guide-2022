import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import User from "./User";

export const UserDetails = () => {
  const [userProfile, setUserProfile] = useState();
  const { getUser } = useContext(UserProfileContext);
  const { id } = useParams();

 

  useEffect(() => {
    getUser(id).then(setUserProfile);
  }, []);

 

  if (!userProfile) {
    return null;
  }

  return ( 
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
            <p><b>Email:</b> {userProfile.email}</p>
           <p><b>Display Name:</b> {userProfile.displayName}</p>
        </div>
      </div>
    </div>
  );
};