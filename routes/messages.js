const router = require('express').Router();

router.get('/:id', (req, res) => {
  res.render('messages/index');
});
module.exports = router;
