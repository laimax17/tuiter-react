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
  const max = {
    username: "maxc1",
    password: "max17",
    email: "max@123.com",
  };

  const sam = {
    username: "samc1",
    password: "sam17",
    email: "sam@123.com",
  };

  const chan = {
    username: "chan1",
    password: "chan17",
    email: "chan@123.com",
  };

  const users = [max,sam,chan];
  const newUsers = [max,sam,chan];

  const conTuit1 = {
    tuit: "Hello World -- max",
  };

  const conTuit2 = {
    tuit: "Hello World -- sam",
  };

  const conTuit3 = {
    tuit: "Hello World -- chan",
  };

  const tuitsC = [conTuit1,conTuit2,conTuit3]; 



  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    
      const del = Promise.all(users.map(x => 
        deleteUsersByUsername(x.username)
      ))
      const create = Promise.all(users.map(user => 
        createUser(user)
        ))
    // deleteUsersByUsername(max.username);
    // deleteUsersByUsername(sam.username);
    // deleteUsersByUsername(chan.username);
    // const newUser1 = await createUser(max);
    // const newUser2 = await createUser(sam);
    // const newUser3 = await createUser(chan);
  });

  afterAll(() => {
    users.map(x => 
      deleteUsersByUsername(x.username)
    )
  });

  test("can retrieve all tuits with REST API", async() => {

    const allUsers = await findAllUsers();

    expect(allUsers.length).toBeGreaterThanOrEqual(users.length);

    const newUser1 = allUsers.filter((x) => x.username === max.username);
    const newUser2 = allUsers.filter((x) => x.username === sam.username);
    const newUser3 = allUsers.filter((x) => x.username === chan.username);
    //console.log(newUser3);
    console.log(newUser1[0]._id);
    console.log(newUser2[0]._id);
    console.log(newUser3[0]._id);
    
    
    const newTuit1 = await createTuit(newUser1[0]._id, conTuit1);
    const newTuit2 = await createTuit(newUser2[0]._id, conTuit2);
    const newTuit3 = await createTuit(newUser3[0]._id, conTuit3);
    console.log(newTuit1);
    const allTuits = await findAllTuits();
    console.log(newUser1[0]._id);
    console.log(newUser2[0]._id);
    console.log(newUser3[0]._id);
    const retrieveTuit1 = allTuits.filter((x) => x.postedBy === newUser1[0]._id);
    const retrieveTuit2 = allTuits.filter((x) => x.postedBy === newUser2[0]._id);
    const retrieveTuit3 = allTuits.filter((x) => x.postedBy === newUser3[0]._id);
    
    console.log(retrieveTuit1);
    expect(retrieveTuit1._id).toEqual(newTuit1._id);
    expect(retrieveTuit2._id).toEqual(newTuit2._id);
    expect(retrieveTuit3._id).toEqual(newTuit3._id);
    deleteTuit(newTuit1._id);
    deleteTuit(newTuit2._id);
    deleteTuit(newTuit3._id);

  });
 });
 





