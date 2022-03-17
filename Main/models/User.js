const{Schema, model} = require ('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength:50,
        },

        email: {
            type:String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],

        friends: [
            {
                types: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },

    {
        toJSON:{
            virtuals: true,
        },
            id: false

    }
);

userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});


const User = model ('User', userSchema);

module.exports = User;