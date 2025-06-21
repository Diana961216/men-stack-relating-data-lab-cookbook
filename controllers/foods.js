const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate('foods');
        res.render('foods/index.ejs', {
            foods: currentUser.foods,
            user: currentUser
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});


router.get('/new', (req, res) => {
    res.render('foods/new.ejs',)
});

router.post('/', async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id);
        currentUser.foods.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect('/')
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const foodToDelete = currentUser.foods.id(req.params.itemId);
      
      if (!foodToDelete) {
        return res.send('Item not found.');
      }
  
      foodToDelete.deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

module.exports = router;