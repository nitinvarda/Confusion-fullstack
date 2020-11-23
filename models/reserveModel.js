const mongoose = require('mongoose')
const Schema = mongoose.Schema




const reserveSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reservations: [{
        guests: {
            type: Number,
            required: true
        },
        smoking: {
            type: Boolean,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})


const Reservations = mongoose.model('Reservations', reserveSchema)

module.exports = Reservations