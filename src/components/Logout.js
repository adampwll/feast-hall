import React from 'react';
import { GoogleLogout } from 'react-google-login';
import {CLIENT_ID} from '../resources/constants/AppConstants'

function Logout() {
  const onSuccess = () => {
    alert('Successfully logged out');
  }

  return (
    <div>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;