const express = require('express')
const router = express.Router()

const Promos = require('../models/promoModel');
const { protect, admin } = require('../middleware/authenticate')


var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
var path = require('path')




var storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // crypto creates 16 random numbers 
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                // the random numbers are converted to string and stored with the image original file extension like jpg,png..etc
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    // filename consists of new filename
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
var upload = multer({ storage });

router.route('/')
    .options((req, res) => { res.sendStatus(200); }).
    get((req, res, next) => {
        Promos.find({})
            .then(promos => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos)
            }, (err) => next(err))
            .catch(err => {
                next(err)
            })



    }).post(protect, admin, upload.single("promoImage"), (req, res, next) => {
        const { name, description, label, price, featured } = req.body
        Promos.create({
            name,
            label,
            price: Number(price),
            image: req.file.filename,
            featured,
            description,
        })
            .then(promo => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo)


            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    }).put(protect, admin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /promotions')
    }).delete(protect, admin, (req, res) => {
        Promos.remove({})
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    });



// promoId router


router.route('/:promoId')
    .options((req, res) => { res.sendStatus(200); })
    .get((req, res, next) => {

        Promos.findById(req.params.promoId)
            .then(promo => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    }).post(protect, admin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation not supported on /promotions/' + req.params.promoId)

    }).put(protect, admin, (req, res, next) => {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        })
            .then(promo => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })
    }).delete(protect, admin, (req, res) => {
        Promos.findByIdAndRemove(req.params.promoId)
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })
    })

module.exports = router