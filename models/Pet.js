const mongoose       = require('mongoose');
const { schema } = require('./Comment');
const Schema        = mongoose.Schema;

const ImageSchema = new Schema({
    url:String,
    filename:String
})
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200/h_200')
})

const opts = {toJSON: { virtuals: true } };

const PetSchema = new Schema({
    name  : String,
    images : [ImageSchema ],
    geometry: {
        type: {
            type:String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    type: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
},opts);

PetSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/pets/${this._id}">${this.name}</a><strong><p>${this.location}</p>`
})
///////////////
module.exports = mongoose.model('Pet', PetSchema);