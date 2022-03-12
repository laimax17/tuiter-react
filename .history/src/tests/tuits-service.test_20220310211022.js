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
  const max1 = {
    username: "max12312",
    password: "max17",
    email: "max@123.com",
  };

  const sam1 = {
    username: "samc11223",
    password: "sam17",
    email: "sam@123.com",
  };

  const ken1 = {
    username: "ken1233",
    password: "ken17",
    email: "chan@123.com",
  };

  const users = [max1,sam1,ken1];
  

  const conTuit1 = {
    tuit: "Hello World -- max1122313",
  };

  const conTuit2 = {
    tuit: "Hello World -- sam2",
  };

  const conTuit3 = {
    tuit: "Hello World -- ken3",
  };

  const tuitsC = [conTuit1,conTuit2,conTuit3]; 

  const currTuitList = [];

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    
      const del = Promise.all(users.map(x => 
        deleteUsersByUsername(x.username)
      ))
      // const a1 = await users.map(x => 
      //   deleteUsersByUsername(x.username)
      // );
      
      // const create = Promise.all(users.map(user => 
      //   createUser(user)
      //   ))
    // deleteUsersByUsername(max.username);
    // deleteUsersByUsername(sam.username);
    // deleteUsersByUsername(chan.username);
    
      });

  afterAll(async() => {
    users.map(x => 
      deleteUsersByUsername(x.username)
    );

    currTuitList.forEach((x) => {
      deleteTuit(x._id);
       
    });

  test("can retrieve all tuits with REST API", async() => {
    // users.map(x => 
    //   deleteUsersByUsername(x.username)
    // )
    //const upUser = await users.map(x => createUser(x));
    //const a2 = await users.map(x => createUser(x));
    let i = 0;
    for (i = 0; i < 3; i++ ) {
      const newUs = await createUser(users[i]);
    }
    
    let currUserList = [];
    const allUsers = await findAllUsers();
      //console.log(allUsers);
    users.forEach(async(x) => {
      //console.log(x);
      const currUser = await allUsers.find(user => user.username === x.username);
      currUserList.push(currUser);
      const newT = await createTuit(currUser._id,conTuit1);
      console.log(newT);
    })

    const allTuits = await findAllTuits();
    //console.log(allTuits);
    console.log(currUserList);
    

    currUserList.forEach(async (x) => {
      const currTuits = allTuits.find(tuit => tuit.postedBy === x._id);
      console.log(currTuits);
      currTuitList.push(currTuits);
      expect(currTuits.tuit).toEqual(conTuit1.tuit);
      //const d = await deleteTuit(currTuits._id);
    })
    console.log(currTuitList);

  });
 });
 





