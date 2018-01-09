const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Sample'}]})
})

module.exports = router
