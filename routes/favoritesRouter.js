const express = require('express')
const Favourite = require('../models/favoritesModel')
const router = express.Router()
const { protect, admin } = require('../middleware/authenticate');
const Dishes = require('../models/dishModel');


router.route("/")
    .get(protect, (req, res, next) => {
        Favourite.find({ user: req.user._id })
            .populate('user')
            .populate('dishes')
            .then(dishes => {
                res.json(dishes)
            })
            .catch(err => {
                next(err)
            })

    })
    .post(protect, (req, res, next) => {
        Favourite.find({ user: req.user._id })
            .populate('user')
            .then(dishes => {
                if (dishes.length != 0) {

                    dishes.dishes.push(req.body)
                }
                else {
                    var array = req.body
                    var newArray = []
                    array.map(id => {
                        return newArray.push(id._id)
                    })

                    Favourite.create({
                        user: req.user._id,
                        dishes: newArray
                    })
                        .then(dishes => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dishes)
                        })
                        .catch(err => {
                            next(err)
                        })
                }

            })
            .catch(err => {
                next(err)
            })
    })

    .delete(protect, (req, res, next) => {
        Favourite.findOneAndDelete({ user: req.user._id })
            .then(favs => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favs)


            })
            .catch(err => next(err))

    })


router.route("/:id")

    .post(protect, (req, res, next) => {

        Favourite.findOne({ user: req.user._id })
            .then(favs => {
                if (favs) {
                    let exist = favs.dishes.filter(id => id == req.params.id)

                    if (exist.length >= 1) {
                        var err = new Error('you have already added this dish')
                        next(err)

                    }
                    else {
                        favs.dishes.push(req.params.id)
                        favs.save()
                            .then(favs => {

                                res.send('added')
                            })
                            .catch(err => {
                                next(err)
                            })

                    }


                }


                else {
                    Favourite.create({
                        user: req.user._id,
                        dishes: [req.params.id]
                    })
                        .then(fav => {
                            res.json(fav)
                        })
                        .catch(err => {
                            next(err)
                        })
                }




            })
            .catch(err => next(err))

    })

    .delete(protect, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .then(favourites => {

                const newDishes = favourites.dishes.filter(id => id != req.params.id)
                favourites.dishes = newDishes

                favourites.save()
                    .then(fav => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav)

                    })
                    .catch(err => next(err))
            })

    })

module.exports = router