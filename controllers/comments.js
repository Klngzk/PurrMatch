const Pet                 = require('../models/Pet.js');
const Comment             = require('../models/Comment.js');

module.exports.createComment = async(req, res) => {
    const pet = await Pet.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    pet.comments.push(comment);
    await comment.save();
    await pet.save();
    req.flash('success', 'You just created a new comment')
    res.redirect(`/pets/${pet._id}`)
}

module.exports.deleteComment = async(req,res) =>{
    const {id,commentId} = req.params;
    await Pet.findByIdAndUpdate(id,{$pull:{comments: commentId}})
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Successfully deleted comment')
    res.redirect(`/pets/${id}`)

}