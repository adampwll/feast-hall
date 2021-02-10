import React, {useState} from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName || ''
    };
  }

  render() {
    return(
      <table>
        <tr>
          <td>
            {this.state.userName}
          </td>
        </tr>
      </table>
    );
  }
}

export default UserProfile