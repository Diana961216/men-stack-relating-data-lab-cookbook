const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.send('User not found');
    res.render('users/show.ejs', { otherUser: user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;