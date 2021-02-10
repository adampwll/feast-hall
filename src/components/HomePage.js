import React from 'react';
import UserProfile from './UserProfile'
import Clock from './Clock'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date() 
    }
  }
  render() {
    return(
      <div>
        <Clock/>
        <table width='100%' border='1px solid black'>
          <tr>
            <td width='30%'>
              <h2>Upcoming Games</h2>
            </td>
            <td width='30%'>
              <h2>Profile</h2>
            </td>
            <td width='30%'>
              <h2>Players</h2>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <UserProfile userName='Adam'/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default HomePage;