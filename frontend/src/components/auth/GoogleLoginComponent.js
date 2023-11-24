import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginComponent = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"  // Replace with your actual Google Client ID
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
