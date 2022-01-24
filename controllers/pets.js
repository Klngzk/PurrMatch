const Pet                 = require('../models/Pet.js');
const mbxGeocoding        =require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken         =process.env.MAPBOX_TOKEN
const geocoder              =mbxGeocoding({accessToken: mapBoxToken})
const{ cloudinary }       = require('../cloudinary');


/////
//Index R
module.exports.petsIndex = async(req , res) => {
    const pets = await Pet.find({});

     res.render("pets/index",{pets})
     
 }
 /////
 //New R
 module.exports.renderNew = async(req,res) =>{
    res.render("pets/new")
};
/////
//Create R
module.exports.createNew = async(req, res) =>{
    const geoData = await geocoder.forwardGeocode({
        query: req.body.pet.location,

    }).send()
    const pet= new Pet(req.body.pet);
    pet.geometry= geoData.body.features[0].geometry;
    pet.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    pet.author = req.user._id;
    await pet.save();
    req.flash('success', 'Successfully made a new post')
    res.redirect(`/pets/${pet._id}`)
}
/////
//Show R
module.exports.renderShow = async (req, res) => {
    const pet = await Pet.findById(req.params.id).populate({path:'comments',populate:{path:'author'}}).populate('author');
    if(!pet){
       req.flash('error','Cannot find that post');
       return res.redirect('/pets')
   }
    res.render('pets/show',{pet});
}
/////
//Edit R
module.exports.renderEdit =  async (req,res) => {
    const pet = await (await Pet.findById(req.params.id));
    res.render('pets/edit',{pet});
}
/////
//Update R
module.exports.updateEdit = async (req, res) => {
    const {id} = req.params;
    const pet = await Pet.findByIdAndUpdate(id, {...req.body.pet});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    pet.images.push(...imgs);
    const geoData = await geocoder.forwardGeocode({
        query: req.body.pet.location,

    }).send()
    pet.geometry= geoData.body.features[0].geometry;
    await pet.save();
    if( req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await pet.updateOne({$pull :{images:{filename:{$in: req.body.deleteImages}}}})
    }
    req.flash('success', 'Successfully updated the post')
    res.redirect(`/pets/${pet._id}`)
}
/////
//Delete R
module.exports.deletePost = async (req, res) => {
    const {id} = req.params;
    await Pet.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a post');
    res.redirect("/pets");
}

