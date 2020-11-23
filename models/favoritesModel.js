const mongoose = require('mongoose')
const Schema = mongoose.Schema




const favouriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dish'
    }]
}, {
    timestamps: true
})

const Favourite = mongoose.model('Favourites', favouriteSchema)

module.exports = Favourite