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
    console.log(newTuit);
    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(conTuit.tuit);
    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    
  });
});

// describe("can delete tuit wtih REST API", () => {
//   // TODO: implement this
//   const max = {
//     username: "maxc",
//     password: "max17",
//     email: "max@123.com",
//   };
//   const conTuit = {
//     tuit: "Hello World -- max",
//   };

//   beforeAll(() => {
//     // clean up before the test making sure the user doesn't already exist
//     return deleteUsersByUsername(max.username);

//   });

//   afterAll(() => {
    
//     return deleteUsersByUsername(max.username);
//   });

//   test("can delete tuit wtih REST API", async () => {
//     const newUser = await createUser(max);
//     // verify new user matches the parameter user
//     // expect(newUser.username).toEqual(max.username);
//     // expect(newUser.password).toEqual(max.password);
//     // expect(newUser.email).toEqual(max.email);
//     // verify new tuit matches the parameter tuit
//     const newTuit = await createTuit(newUser._id, conTuit);
//     expect(newTuit.postedBy).toEqual(newUser._id);
//     expect(newTuit.tuit).toEqual(conTuit.tuit);

//     // delete a tuit by their id. Assumes tuit already exists
//     const status = await deleteTuit(newTuit._id);
//     // verify we deleted at least one user by their username
//     expect(status.deletedCount).toBeGreaterThanOrEqual(1);
//   });
// });

// describe("can retrieve a tuit by their primary key with REST API", () => {
//   // TODO: implement this
//   findTuitById()

//   const max = {
//     username: "maxc",
//     password: "max17",
//     email: "max@123.com",
//   };
//   const conTuit = {
//     tuit: "Hello World -- max",
//   };

//   beforeAll(() => {
//     // clean up before the test making sure the user doesn't already exist
//     return deleteUsersByUsername(max.username);

//   });

//   afterAll(() => {
    
//     return deleteUsersByUsername(max.username);
//   });

//   test("can retrieve a tuit by their primary key with REST API", async() => {
//     const newUser = await createUser(max);
//     const newTuit = await createTuit(newUser._id, conTuit);

//     const retrieveTuit = await findTuitById(newTuit._id);

//     expect(retrieveTuit.tuit).toEqual(newTuit.tuit);
//     expect(retrieveTuit.postedBy).toEqual(newTuit.postedBy);
//     deleteTuit(newTuit._id);
//   });

// });





