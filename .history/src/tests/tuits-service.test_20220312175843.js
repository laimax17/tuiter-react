import {
  findAllTuits,
  findTuitById,
  findTuitByUser,
  createTuit,
  updateTuit,
  deleteTuit,
} from "../services/tuits-service";

import {
  createUser,
  deleteUsersByUsername,
  findAllUsers,
  findUserById,
} from "../services/users-service";

describe("can create tuit with REST API", () => {
  // TODO: implement this
  const max = {
    username: "maxc",
    password: "max17",
    email: "max@123.com",
  };
  const conTuit = {
    tuit: "Hello World -- max",
  };

  // setup before running test
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(max.username);
  });

  afterAll(() => {
    
    return deleteUsersByUsername(max.username);
  });

  test("can create tuit with REST API", async () => {
    const newUser = await createUser(max);
    // verify new user matches the parameter user
    // expect(newUser.username).toEqual(max.username);
    // expect(newUser.password).toEqual(max.password);
    // expect(newUser.email).toEqual(max.email);

    const newTuit = await createTuit(newUser._id, conTuit);
    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(conTuit.tuit);
    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    
  });
});

describe("can delete tuit wtih REST API", () => {
  // TODO: implement this
  const max = {
    username: "maxc",
    password: "max17",
    email: "max@123.com",
  };
  const conTuit = {
    tuit: "Hello World -- max",
  };

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(max.username);

  });

  afterAll(() => {
    
    return deleteUsersByUsername(max.username);
  });

  test("can delete tuit wtih REST API", async () => {
    const newUser = await createUser(max);
    // verify new user matches the parameter user
    // expect(newUser.username).toEqual(max.username);
    // expect(newUser.password).toEqual(max.password);
    // expect(newUser.email).toEqual(max.email);
    // verify new tuit matches the parameter tuit
    const newTuit = await createTuit(newUser._id, conTuit);
    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(conTuit.tuit);

    // delete a tuit by their id. Assumes tuit already exists
    const status = await deleteTuit(newTuit._id);
    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("can retrieve a tuit by their primary key with REST API", () => {
  // TODO: implement this
  const max = {
    username: "maxc",
    password: "max17",
    email: "max@123.com",
  };

  const conTuit = {
    tuit: "Hello World -- max",
  };

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(max.username);

  });

  afterAll(() => {
    
    return deleteUsersByUsername(max.username);
  });

  test("can retrieve a tuit by their primary key with REST API", async() => {
    const newUser = await createUser(max);
    const newTuit = await createTuit(newUser._id, conTuit);

    const retrieveTuit = await findTuitById(newTuit._id);
    expect(retrieveTuit._id).toEqual(newTuit._id);
    deleteTuit(newTuit._id);
  });

});

describe("can retrieve all tuits with REST API", () => {
  // TODO: implement this

  const createTuits = [
    "first",
    "second",
    "third",
  ];

  test("can retrieve all tuits with REST API", async () => {
    const allTuits = await findAllTuits();

    const tuitsInserted = allTuits.filter((tuit) =>
      createTuits.includes(tuit.tuit)
    );

    //get all ids of the sample tuits for deleting after test
    const ids = tuitsInserted.map((item) => item._id);

    // get the item matching those in the sample list
    tuitsInserted.forEach((tuit) => {
      const sample = createTuits.find(
        (sampleTuit) => sampleTuit === tuit.tuit
      );
      expect(sample).toEqual(tuit.tuit);
    });

    // delete all test sample after finishing the test
    ids.forEach(async (id) => {
      const status = await deleteTuit(id);
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
  });
});