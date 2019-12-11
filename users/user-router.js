const express = require("express");

const db = require("../data/db-config.js");
const Users = require("./user-model"); // 3. import user-router

const router = express.Router();

router.get("/", (req, res) => {
  Users.allUsers()
    .then(users => {
      res.status(200).json(users); // 4. then this goes from db('users') to Users('user') -- and you'd do the same for any of the other requests
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get user" });
    });
});
//previous get /:id code -- for reference
// const { id } = req.params;

// db('users').where({ id })
// .then(users => {
//   const user = users[0];

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'Could not find user with given id.' })
//   }
// })
// .catch(err => {
//   res.status(500).json({ message: 'Failed to get user' });
// });

router.get("/:id/posts", (req, res) => {
  Users.findUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to get posts by userId" });
    });
});
//NOTE -- when this code initially just shows some userIDs with no info and we want to see more stuff, we go to sqlite and write the following in the sqlite db -- which we can rewrite into our user-router code for findUserPosts():
// select p.id
// , p.contents as Quote
// , u.username as Author
// from posts as p
// join users as u
//     on p.user_id = u.id
// where user_id = 1;

router.post("/", (req, res) => {
  const userData = req.body;
  Users.add(userData)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
  // const userData = req.body;

  // db('users').insert(userData)
  // .then(ids => {
  //   res.status(201).json({ created: ids[0] });
  // })
  // .catch(err => {
  //   res.status(500).json({ message: 'Failed to create new user' });
  // });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.put("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
