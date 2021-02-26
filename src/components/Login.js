import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {CLIENT_ID} from '../resources/constants/AppConstants'

function Login() {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res);
  }

  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  }

  return (
    <div>
      <GoogleLogin 
        clientId={CLIENT_ID}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px'}}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login