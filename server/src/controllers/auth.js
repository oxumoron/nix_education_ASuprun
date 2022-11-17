const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const keys = require('../config/config.js')
const errorHandler = require('../utills/errorHandler.js')

module.exports.login = async function (req, res) {
  const {
    username,
    password
  } = req.body;

  if (!(username && password)) {
    res.status(400).send("All fields must be filled");
  }

  const candidate = await User.findOne({
    username
  })

  if (candidate) {
    const passpordRes = bcrypt.compareSync(password, candidate.password)
    // console.log(passpordRes);
    if (passpordRes) {
      const token = jwt.sign({
        username: candidate.username,
        userId: candidate._id
      }, keys.jwt, {
        expiresIn: 60 * 60
      })
      candidate.token = token;
      // console.log({
      //   token,
      //   ...candidate
      // });
      // let options = {
      //   path: "/",
      //   sameSite: true,
      //   maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
      //   httpOnly: true, // The cookie only accessible by the web server
      // }

      // res.cookie('x-access-token', token)

      // res.setHeader('x-access-token', 'Bearer ' + token);
      res.status(200).json({
        token
      })
    } else {
      res.status(401).json({
        message: "Passwords do not match"
      })
    }
  } else {
    res.status(404).json({
      message: "User with this name not found"
    })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  })

  if (candidate) {
    res.status(409).json({
      message: 'Такой email занят. Попробуйте другой.'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json({
        user
      })
    } catch (e) {
      errorHandler(res, e)
    }
  }
}