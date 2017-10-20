var express = require('express');
var router = express.Router();
var api=require("../controllers/apiController");
/* GET home page. */
router.get('/', api.index);
router.post('/', api.add);
router.post('/edit/:id', api.edit);
router.get('/:id', api.show);
router.get('/delete/:id', api.deleteBook);

module.exports = router;
