
require('dotenv').config();


const express             = require("express");
const app                 = express();
const path                = require('path');
const ejsMate             = require('ejs-mate');
const methodOverride      = require('method-override');
const bodyParser          = require("body-parser");
const mongoose            = require("mongoose");
const session             = require('express-session')
const flash               = require('connect-flash')
//////////////
const Pet                 = require('./models/Pet.js');
const Comment             = require('./models/Comment.js');
//////////
const petRoutes           = require('./routes/pets');
const commentRoutes       = require('./routes/comments');
const userRoutes          = require("./routes/users")

const { dirname } = require("path");
/////////
const passport            = require('passport');
const LocalStrategy       = require("passport-local")
const User                = require("./models/user.js")
/////////

////////
const mongoSanitize       = require('express-mongo-sanitize')
const helmet              = require('helmet')
////////                       
const db_url = process.env.DB_URL || 'mongodb://localhost:27017/purrMatch'
// const db_url0 ='mongodb://localhost:27017/purrMatch'

const MongoStore         = require("connect-mongo");
//mongodb://localhost:27017/purrMatch
mongoose.connect(db_url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex:true})
.then(() => {
    console.log("Connected")
})
.catch(err => {
    console.log(err)
});
//////////
app.use(bodyParser.urlencoded({extended: true}))
app.engine('ejs',ejsMate);
app.set('views', path.join(__dirname, '/views'))
app.set("view engine", "ejs")
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(mongoSanitize())
app.use(helmet({ contentSecurityPolicy:false}))
/////////////
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('particles-js', 'assets/particles.json', function() {
//     console.log('callback - particles.js config loaded');
//   });
  

//Sessions/
const secret = process.env.SECRET || 'zikoago'

const store = MongoStore.create({
    mongoUrl:db_url,
    secret,
    touchAfter: 24 * 60 * 60

})
store.on('error' ,function(e){
    console.log('session store error', e)
})


const sessionConfig={
    store: store,
    name:'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 *60 * 60 *24 * 7,
        maxAge:  1000 *60 * 60 *24 * 7
    }
}
app.use(session(sessionConfig))
////////
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) =>{

    res.locals.currentUser = req.user;
    res.locals.success     = req.flash('success');
    res.locals.error       = req.flash('error');
    next()
})

app.get("/", function(req, res){
    res.render("landing");
});



////////
app.use('/', userRoutes);
app.use('/pets', petRoutes);
app.use('/pets/:id/comments', commentRoutes);
////////






const port = process.env.PORT || "3000"

app.listen(port, function(){
    console.log(`Server are UP ${port}`);
});