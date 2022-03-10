const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//The name of the pizza
//The name of the user that created the pizza
//A timestamp of when the pizza was created
//A timestamp of any updates to the pizza's data
//The pizza's suggested size
//The pizza's toppings

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        //add validation
        required: true, 
        trim: true
    },
    createdBy: {
        type: String,
        //add validation
        required: true,
        trim: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        //Add validation
        required: true, 
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce(
        (total, comment) => total + comment.replies.length + 1, 0);
});

//create the model using pizzaSchema

const Pizza = model('Pizza', PizzaSchema);
//export the pizza model 
module.exports = Pizza; 

