import { render } from "@testing-library/react"
import {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";

function Players() {
  const [players, setPlayers] = useState();
  const [lists, setLists] = useState([]);

  return(
    <>
      <h3>{players}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Name</td>
            <td>Armies</td>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </Table>
    </>
  );
}

export default Players;