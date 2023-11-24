import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setJWTToken } from '../../state/actions/authActions'; // Assuming this action exists

const Auth = () => {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (googleResponse) => {
    try {
      // Send Google token to backend for verification and JWT
      const response = await axios.post('/auth/google', {
        token: googleResponse.tokenId,
      });

      // Dispatch action to store JWT token in Redux
      if (response.data.access_token) {
        dispatch(setJWTToken(response.data.access_token));
        // Redirect or update UI based on successful login
      }
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Failure:', error);
  };

  return (
    <div className="auth-container">
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google Client ID
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Auth;
