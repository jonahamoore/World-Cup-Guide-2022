import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import User from "./User";

export const UserDetails = () => {
  const [UserProfile, setUserProfile] = useState();
  const { getUser } = useContext(UserProfileContext);
  const { id } = useParams();

 

  useEffect(() => {
    getUser(id).then(setUserProfile);
  }, []);

 

  if (!UserProfile) {
    return null;
  }

  return ( 
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
            <p><b>Email:</b> {UserProfile.Email}</p>
           <p><b>Display Name:</b> {UserProfile.DisplayName}</p>
      <p><b>User Type:</b> {UserProfile.UserType.Name}</p>
        </div>
      </div>
    </div>
  );
};

