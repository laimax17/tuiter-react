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
    //expect(retrieveTuit.tuit).toEqual(newTuit.tuit);
    //expect(retrieveTuit.postedBy).toEqual(newTuit.postedBy);
    deleteTuit(newTuit._id);
  });

});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
  //const usernames = ['larry', 'curley', 'moe'];

  const usernames = ['lai','yun','choi'];

  beforeAll(() =>{
    Promise.all(usernames.map((username) => deleteUsersByUsername(username)));

    Promise.all(usernames.map((username) => createUser({
      username: username,
      password: `${username}1234`,
      email: `${username}@gg.com`
    })
    
    ))
  }
  )

  afterAll(() =>
    Promise.all(usernames.map((username) => deleteUsersByUsername(username)))
  );

  test('can retrieve all tuits from REST API', async () => {
    const allUsers = await findAllUsers();

    const users = await allUsers.filter(
      user => usernames.indexOf(user.username) >= 0);

      //console.log(users);
    const sampleTuits = users.map((user) =>
      createTuit(user._id, `sorry ${user.username}`)
    );
    const theTuits = []
    sampleTuits.forEach(item => {
      item.then((res) => theTuits.push(res))
    })
    const retrievedTuits = await findAllTuits();
    //expect(retrievedTuits.length).toBeGreaterThanOrEqual(sampleTuits.length);
      //console.log(theTuits);
      //console.log()
    // const tuitsInserted = retrievedTuits.filter(
    //   (tuit) =>
    //     sampleTuits.indexOf({ postedBy: tuit.postedBy, tuit: tuit.tuit }) >= 0
    // );
    const tuitsInserted = retrievedTuits.filter(
      tuit => tuit.tuit.includes("sorry")
    )
    //console.log("here\n");
      //console.log(tuitsInserted);
    tuitsInserted.forEach((insertedTuit) => {
      // const tuit = sampleTuits.find(
      //   (sampleTuit) =>
      //     sampleTuit.postedBy === insertedTuit.postedBy &&
      //     sampleTuit.tuit === insertedTuit.tuit
      // );
      
      const curUser = users.find(user => user._id === insertedTuit.postedBy._id);
      
      expect(curUser._id).toEqual(insertedTuit.postedBy._id);
      expect(`sorry ${curUser.username}`).toEqual(insertedTuit.tuit);
      
    });

    tuitsInserted.forEach((insertedTuit) => {
      const status = deleteTuit(insertedTuit._id);
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
  });
});
