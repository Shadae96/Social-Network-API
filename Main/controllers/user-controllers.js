const {User} = require ('../models');

module.exports = {
    // function to find all users
getUsers(req, res){
    User.find()
        .then(async(users) => {
            const userObj = {
                users,
            };

        return res.json(userObj);  
        }) 
       .catch ((err) => {
           console.log(err);
           return res.status(500).json(err);
       }); 
    },

//  Get a single User

getSingleUser(req,res){
    User.findOne({_id:req.params.userId})
    .select('-__v')
    .then (async (user) =>
    !user
    ? res.status(404).json ({ message: 'No user with that ID'})
    : res.json({
        user
        })
    )
    .catch((err) =>
    { console.log(err);
        return res.status(500).json(err);
    })    
},

// Create a New User

createUser (req, res) {
    User.create (req.body)
    .then((user)=> res.json (user))
    .catch((err) => res.status(500).json(err));
},

// Update an existing user

updateUser (req,res) {
    User.findByIdAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        { runValidators: true, new: true}
    )
    .then((user) =>
    !user 
    ? res.status(404).json({message: 'Could not update User. User does not exist'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},


// Delete a User and their thoughts (come back to this)

deleteUser(req,res){
    User.findOneAndRemove({_id: req.params.userId})
    .then((user)=> 
    !user
    ? res.status(404).json({ message:'No such user exists'})
    : User.findOneAndUpdate(
        {users: req.params.userId},
        {$pull:{ user: req.params.userId}},
        {new: true}
    ))
    .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'user and their thoughts have been successfully deleted' })
    )
    .catch((err) => res.status(500).json(err))
},

// Add a friend to existing user
addFriend(req,res){
    console.log('adding a new friend');
    console.log(re.body);
    User.findOneAndUpdate(
        {_id:req.params.userId},
    {$addToser: {friends: req.params.friendId}},
    { runValidators: true, new: true}
    )
    .then((user) =>
    !user 
    ? res.status(404).json({message: 'No user found with that ID'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
// Delete a friend from existing user

removeFriend(req,res){
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: { friends: req.params.reactionId}},
        {runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
      ? res.status(404).json({
          message: 'User deleted, but no thoughts found',
        })
      : res.json({ message: 'no thoughts found with that ID' })
)
.catch((err) => res.status(500).json(err));
},

};