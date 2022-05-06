const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema ({
    stateCode: {
        type: String,
        required: true,
        unique: true,
    },
    funFacts: {
        type: [String],
    }
});

stateSchema.set('collection', 'statesDB');

module.exports = mongoose.model("statesDB", stateSchema);