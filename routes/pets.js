const express             = require("express");
const router              = express.Router();
const Pet                 = require('../models/Pet.js');
const pets                = require('../controllers/pets.js')
const {isLoggedIn,
       isAuthor,}         = require('../middleware.js')
const multer              = require('multer')
const {storage}           = require('../cloudinary')
const upload              = multer({storage})

/////
//Index R
/////
router.get("/", pets.petsIndex)
 /////
 //New R
 /////
 router.get("/new", isLoggedIn , pets.renderNew)
 /////
 //Create R
 /////
 router.post("/", isLoggedIn ,upload.array('image'), pets.createNew)
// router.post('/', upload.array('image'),(req,res) =>{
//        console.log(req.body, req.files);
//        res.send('sadasd')
// })
 /////
 //Show R
 router.get("/:id", pets.renderShow)
 /////

 //Update R
 /////
 router.put("/:id", isLoggedIn,upload.array('image'),isAuthor, pets.updateEdit)
 /////
 //Delete R
 /////
 router.delete("/:id",isLoggedIn,isAuthor, pets.deletePost)
 //////
  //Edit R
 /////
 router.get("/:id/edit", isLoggedIn, pets.renderEdit)
 /////
 ////////////////////////////////////////////////
 module.exports = router;