import { render } from "@testing-library/react"
import {useEffect, useState} from 'react';
import { Table } from "react-bootstrap";

function Games() {
  const [games, setGames] = useState();
  const [lists, setLists] = useState([]);

  return (
    <>
      <h3>{games}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Upcoming</td>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </Table>
      <h2>Calendar</h2>
    </>
  );
}

export default Games;