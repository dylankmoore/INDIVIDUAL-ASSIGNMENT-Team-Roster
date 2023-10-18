/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div id="profile" className="user-page">
      <img src={user.photoURL} alt="user" width="100px" height="100px" className="user-display-photo" />
      <div className="infos"><br />
        <h5 className="user-info">username: {user.displayName}</h5>
        <h6 className="user-info">user e-mail: {user.email}</h6>
        <h6 className="user-info">last login: {user.metadata.lastSignInTime}</h6>
      </div>
    </div>
  );
}
