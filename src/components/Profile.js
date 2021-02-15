import { render } from "@testing-library/react"

import {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";

function Profile() {
  const [profile, setProfile] = useState();
  const [lists, setLists] = useState([]);

  return(
    <>
      <h3>{profile}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Name</td>
            <td>Army</td>
            <td>Points</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </Table>
    </>
  );
}

export default Profile;