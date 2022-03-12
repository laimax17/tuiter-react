import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  { tuit: "alice's tuit", _id: "99871" },
  { tuit: "bob's tuit", _id: "51312" },
  { tuit: "charlie's tuit", _id: "79896" },
];



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

