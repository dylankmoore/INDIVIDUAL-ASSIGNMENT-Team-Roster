/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '430px',
        margin: '0 auto',
      }}
    >
      <div id="loadingimg">
        <img src="/logo.png" alt="icon" className="nav-logo" width="400" height="400" id="image" />
      </div>
      <div id="welcome">
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="medium" id="signin" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
