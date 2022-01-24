const express             = require("express");
const router              = express.Router({mergeParams: true });
const Pet                 = require('../models/Pet.js');
const Comment             = require('../models/Comment.js');
const {isLoggedIn, isAuthor,isRAuthor}        =require('../middleware.js')
const comments            =require('../controllers/comments.js')


/////////
//Comments
/////////
router.post('/',isLoggedIn, comments.createComment)

router.delete("/:commentId" ,isLoggedIn,isRAuthor, comments.deleteComment)






//////////////////////////////////////////////
module.exports = router;