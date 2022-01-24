const Pet                 = require("./models/Pet");
const Comment             = require('./models/Comment.js');


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error',"You must be Signed in!")
        return res.redirect('/login')
    }
    next();
}

module.exports.isAuthor = async (req,res,next) => {
    const{id} =req.params;
    const pet = await Pet.findById(id);
    if (!pet.author.equals(req.user._id)){
        req.flash('error, "You do NOT have permission to do that!');
        return res.redirect(`/pets/${id}`);
    }
    next();
}

module.exports.isRAuthor = async (req,res,next) => {
    const{id,commentId} =req.params;
    const pet = await Comment.findById(commentId);
    if (!pet.author.equals(req.user._id)){
        req.flash('error, "You do NOT have permission to do that!');
        return res.redirect(`/pets/${id}`);
    }
    next();
}