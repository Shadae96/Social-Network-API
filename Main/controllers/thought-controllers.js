const {Thought} = require ('../models');

module.exports = {
    // function to find all users
getThought(req, res){
    Thought.find()
        .then(async(thoughts) => {
            const thoughtObj = {
                thoughts,
            };

        return res.json(thoughtObj);  
        }) 
       .catch ((err) => {
           console.log(err);
           return res.status(500).json(err);
       }); 
    },

//  Get a single User

getSingleThought(req,res){
    User.findOne({_id:req.params.thoughtId})
    .select('-__v')
    .then (async (thought) =>
    !thought
    ? res.status(404).json ({ message: 'No thought with that ID'})
    : res.json({
        thought
        })
    )
    .catch((err) =>
    { console.log(err);
        return res.status(500).json(err);
    })    
},

// Create a New User

createThought (req, res) {
    Thought.create (req.body)
    .then((thought)=> res.json (thought))
    .catch((err) => res.status(500).json(err));
},

// Update an existing user

updateThought (req,res) {
    User.findByIdAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        { runValidators: true, new: true}
    )
    .then((thought) =>
    !thought 
    ? res.status(404).json({message: 'Could not update thought'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},


// Delete a User and their thoughts (come back to this)

deleteThought(req,res){
    User.findOneAndRemove({_id: req.params.thoughtId})
    .then((thought)=> 
    !thought
    ? res.status(404).json({ message:'No such thought exists'})
    : User.findOneAndUpdate(
        {thoughts: req.params.thoughtId},
        {$pull:{ user: req.params.thoughtId}},
        {new: true}
    ))
    .catch((err) => res.status(500).json(err))
},

// Add a Reaction to thought
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

// Delete a Reaction to thought

removeReaction(req,res){
    Thought.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: { reactions: req.params.reactionId}},
        {runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
      ? res.status(404).json({
          message: 'cannot find that thought',
        })
      : res.json({ message: 'reaction has been deleted' })
)
.catch((err) => res.status(500).json(err));
},

};