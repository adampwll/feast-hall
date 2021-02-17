import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '894344268477-816u8joso197jqko39bbdhinbpb23jhm.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    alert('Successfully logged out');
  }

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;