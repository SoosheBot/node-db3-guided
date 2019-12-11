const db = require('../data/db-config.js');
//1. working backwards from user-router we see there is a get users
//2. once you've added allUsers in module.exports, and write the allUsers function, you need to import it to user-router
module.exports = {
    allUsers, //get
    findById, //get by id
    add, //good thing to call a post
    findUserPosts
}

function allUsers() {
    return db('users');
}

function findById(id) {
    return db('users').where({id}).first();
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(([id]) => this.get(id)); // destructured
      //can also write it this way .then(ids => {
    //  const [id] = ids;
    //  return findById(id);
    //  })
  }

  //practicing a join
function findUserPosts(userId) {
// from sqlite -- this translates to --the following return
// select p.id
// , p.contents as Quote
// , u.username as Author
// from posts as p 
// join users as u
//     on p.user_id = u.id
// where user_id = 1;
// can also write the following as -- return select().from().join().where()
    return db('posts as p')
    .select('p.id', 'p.contents as Quote', 'u.username as Author')
    .join('users as u', 'p.user_id', '=','u.id' )
    // can do as many .join() as you want!
    .where('user_id', userId)
}