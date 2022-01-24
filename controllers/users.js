const User              = require("../models/user");

module.exports.registerForm = async(req,res) => {
    res.render('users/register');

};

module.exports.registerUser = async(req,res) =>{
    try{
   const {email,username,password} = req.body;
   const user = new User({email,username});
   const registerUser = await User.register(user,password);
   req.login(registerUser, err => {
       if(err) return next(err)
       req.flash('success',"Welcome to PurrMatch!")
       res.redirect("/pets");
   })

    }catch(e){
        req.flash('error',e.message)
        res.redirect('/login')
    }
  

}

module.exports.loginForm = async(req,res) =>{
    res.render('users/login');
}

module.exports.loginUser = async(req,res) => {
    req.flash('success',"Welcome Back!")
    const redirectUrl = req.session.returnTo || "/pets";
    delete req.session.returnTo ;
    res.redirect(redirectUrl)
    
    
}

module.exports.logoutUser = (req,res) => {
    req.logout();
    req.flash('success', "Goodbye!")
    res.redirect('/pets')
}