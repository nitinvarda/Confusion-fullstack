const express = require('express')
const router = express.Router()

const Leaders = require('../models/leaderModel');
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
    .options((req, res) => { res.sendStatus(200); })
    .get((req, res, next) => {
        Leaders.find({})
            .then(leaders => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders)
            }, (err) => next(err))
            .catch(err => {
                next(err)
            })



    }).post(protect, admin, upload.single('leaderImage'), (req, res, next) => {
        const { name, designation, abbr, description, featured } = req.body
        Leaders.create({
            name,
            description,
            designation,
            abbr,
            featured,
            image: req.file.filename
        })
            .then(leader => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)


            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    }).put(protect, admin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /leaders')
    }).delete(protect, admin, (req, res) => {
        Leaders.remove({})
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })
    });



// leaderId router


router.route('/:leaderId')
    .options((req, res) => { res.sendStatus(200); })
    .get((req, res, next) => {

        Leaders.findById(req.params.leaderId)
            .then(leaders => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    }).post(protect, admin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation not supported on /leaders/' + req.params.leaderId)

    }).put(protect, admin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        })
            .then(leader => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)

            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    }).delete(protect, admin, (req, res) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
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