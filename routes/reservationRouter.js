const express = require('express')
const router = express.Router()


const { protect, admin } = require('../middleware/authenticate')
const Reservations = require('../models/reserveModel')


router.route("/")
    .get(protect, (req, res) => {
        Reservations.find({ user: req.user._id }).populate('user', '-password').then(reservations => {
            res.json(reservations)
        })
    })
    .post(protect, (req, res, next) => {
        const { guests, smoking, date } = req.body
        Reservations.find({ user: req.user._id }, (err, data) => {
            if (err) {
                next(err)
            }

            if (data.length >= 1) {
                data[0].reservations.push(req.body)

                const updateData = {
                    user: req.user._id,
                    reservations: data[0].reservations
                }


                Reservations.findByIdAndUpdate(data[0]._id, updateData)
                    .then(data => {
                        Reservations.find({ user: req.user._id }).populate('user', '-password')
                            .then(data => {
                                res.json(data)
                            })
                    })


            }
            else {
                Reservations.create({
                    user: req.user._id,
                    reservations: [req.body]
                }).then(reservations => {
                    res.json(reservations)
                })
                    .catch(err => {
                        next(err)
                    })
            }
        })
    })


router.route("/:reservationId")
    .delete(protect, (req, res, next) => {
        Reservations.findOne({ user: req.user._id })
            .then(data => {
                data.reservations.id(req.params.reservationId).remove()
                data.save()
                    .then(reservation => {
                        res.json([reservation])
                    })



            })
            .catch(err => {
                next(err)
            })
    })



module.exports = router