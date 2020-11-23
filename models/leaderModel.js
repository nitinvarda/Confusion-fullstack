const mongoose = require('mongoose')
const Schema = mongoose.Schema




const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false

    }

}, {
    timestamps: true
})

const Leaders = mongoose.model('leaders', leaderSchema)

module.exports = Leaders