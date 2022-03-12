import {
  createTuitByUser,
  deleteTuit,
  findTuitById,
  findAlltuits
} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this
  // const newTuit = {
  //   tuit: 'test tuit',
  //   postedBy: '6227c73cb78f00231c0b1aab',
  //   postedOn: 'Feb 1,2021'
  // };

  // beforeAll(() => {
  //   return deleteTuit(newTuit.postedBy);
  // }

  // )

  // sample tuit to insert
  const createTuits = {
    tuit: 'test tuit!',
    postedBy: '6227c73cb78f00231c0b1aab',
    postedOn: 'Feb 1,2012'
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all tuits to make sure we create it in the test
    return deleteTuit(createTuits.postedBy);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteTuit(createTuits.postedBy);
  })

  test('can insert new tuits with REST API', async () => {
    // insert new tuit in the database
    const newTuit = await createTuitByUser(createTuits);

    // verify inserted tuit's properties match parameter tuit
    expect(newTuit.tuit).toEqual(createTuits.tuit);
    expect(newTuit.postedBy).toEqual(createTuits.postedBy);
    expect(newTuit.postedOn).toEqual(createTuits.postedOn);
  });

});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});