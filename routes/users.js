var express = require('express');
var router = express.Router();
const { protect, admin } = require('../middleware/authenticate')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')



const JsonSecret = process.env.JSON_SECRET
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
var path = require('path')

const Dishes = require('../models/dishModel');


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
        // const filename = file.originalname
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



router.get("/", (req, res) => {

  User.find({}, (err, users) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json')
      res.json({ error: err })
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.json(users)
    }
  })
})
// upload.single('profileImage'),
router.post('/signup', upload.single("profileImage"), async (req, res) => {

  const { email, password, username } = req.body
  try {
    const user = await User.findOne({ email: email })

    if (user) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json')
      res.json({ error: 'user already exist' })
    }
    else {
      const newUser = new User({
        email,
        username,
        password,
        image: req.file.filename
      })


      await newUser.save()
      const token = jwt.sign({ userId: newUser._id }, process.env.JSON_SECRET)
      const userInfo = {
        name: newUser.username,
        email: newUser.email,
        image: newUser.image,
        _id: newUser._id,
        admin: newUser.admin
      }

      res.json({ token, user: userInfo })

    }
  }
  catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json')
    res.json({ error: err })
  }

})


router.post('/signin', async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' })
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' })
  }

  try {

    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, process.env.JSON_SECRET)
    const userInfo = {
      name: user.username,
      email: user.email,
      image: user.image,
      _id: user._id,
      admin: user.admin
    }
    res.json({ token, user: userInfo })
  }
  catch (err) {
    return res.status(422).send({ error: err })
  }

})

module.exports = router