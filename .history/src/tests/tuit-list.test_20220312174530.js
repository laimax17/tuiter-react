import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import { findAllTuits } from "../services/tuits-service";

import Tuit from "../components/tuits/tuit";
jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/sorry lai/i);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  // TODO: implement this
  axios.get.mockImplementation(() => 
    Promise.resolve({ data: {tuits: MOCKED_TUITS}}));
  const response = await findAllTuits();
  const tuits = response.tuits;
  
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );

  const tuit = screen.getByText(/alice's tuit/i);
  expect(tuit).toBeInTheDocument();
  
});
