const {check,sanitizeBody,validationResult} = require('express-validator');
const user = require('../models/users');

const newUser = (body)=>{
    return {
        username:body.username,
        email:body.email,
        password:body.password
    }
}

const userController = {
checkInput:[
    sanitizeBody('email').normalizeEmail({
        all_lowercase:true
    }),
    check('username','Username is required').notEmpty(),
    check('email','Email is required.').notEmpty(),
    check('email','Invalid Email Address').isEmail(),
    check('password','Password is required').notEmpty()
],
// restric the user from going back to the login page if sessions are available
validateInput: (req,res,next) =>{
    if(req.session.username){
        res.locals.redirect  = '/dashboard';
        next();
    }// else give them acess to the login page
    else{
        //dont skip the next middleware
    req.skip = false;
    const errors = validationResult(req);
    if(errors.errors){
        if (errors.errors.length) {
            req.skip = true;
            res.locals.redirect = '/registrations/signup';
            req.flash('errors',errors.errors);
            next();
        }else{
             req.skip = false;
            next();
        }
        //    
    }
}

},
saveNewUser: async (req,res,next)=>{
    if (req.skip) {
        next();
    }else{
        const _user = newUser(req.body);
             const User = await user.create(_user)
             
            res.cookie('username',User.username);
            res.cookie()
            req.session.username = User.username;
            req.session.userId = User._id;
            req.session.userEmail = User.email;

            //redirect
            res.locals.redirect  = '/dashboard';
            next();
    }
},
checkData:[
    sanitizeBody('email').normalizeEmail({
        all_lowercase:true
    }),
    check('email','Email is required.').notEmpty(),
    check('email','Invalid Email Address.').isEmail(),
    check('password','Password is required.').notEmpty()
],
validateData: (req,res,next)=>{
    if(req.session.username && req.session.userId){
        res.locals.redirect  = '/dashboard';
        next();
    }else{
    req.skip = false;
    const errors = validationResult(req);
    if(errors.errors){
        if (errors.errors.length) {
            req.skip = true;
            res.locals.redirect = '/registrations/login';
            req.flash('errors',errors.errors);
            next();
        }else{
             req.skip = false;
            next();
        }
        //    
    }
}

},
Auth:(req,res,next)=>{
    if(req.skip){
        next();
    }else{
        user.findOne({email:req.body.email})
        .exec().then((user)=>{
            if(user !== null){
                if(req.body.password == user.password){
                    req.session.username = user.username;
            req.session.userId = user._id;
            req.session.userEmail = user.email;
            //redirect
            res.locals.redirect  = '/dashboard';
            next();
                }else{
                    req.flash('errors',[{msg:"Wrong Email/Password Combination."}]);
            res.locals.redirect = '/registrations/login';
                    next();
                }
            }else{
                req.flash('errors',[{msg:"Wrong Email/Password Combination."}]);
                res.locals.redirect = '/registrations/login';
                        next();
            }
        }).catch((error)=>{
            req.flash('errors',[{msg:"Wrong Email/Password Combination."}]);
            res.locals.redirect = '/registrations/login';
                    next(error);
        });
    };
}
,

profileImg:(req,res,next) =>{
    if(req.session.username && req.session.userId){
        let userId = req.session.userId,
        username = req.session.username;
        res.render('uploads',{userId,username});
        next();
    }else{
        res.locals.redirect = '/registrations/login';
        next();        
    }
},
uploads: (req,res,next) =>{
    req.skip = true;
    if(req.files){
      let userImg = req.files.profileImg.name;
      //allowed img extension..
      const allowedfileExt = ['jpg','jpeg','png'];
      //splitted images..
      const splittedImg = userImg.split('.'); // ['name','ext'];
      //file extension..
      const userImgExt = splittedImg[splittedImg.length -1];
        if (allowedfileExt.indexOf(userImgExt) !== -1 ) {
            if(req.files.profileImg.size < 1000000){
                const profileImgNewName = req.files.profileImg.md5+"."+userImgExt;
           //set the image as session..
            req.session.userProfileImage = profileImgNewName;
   /// dont skip the next middleware..
            req.skip = false;

// next middle ware..
            next();
        
                
            }else{
                res.locals.redirect = "/profileimg";
            req.flash('errors',[{msg:"The selected image is too large."}]);

            };
            
        } else {
            res.locals.redirect = "/profileimg";
            req.flash('errors',[{msg:"Invalid Image Extension."}]);
        }

    }else{
        res.locals.redirect = "/profileimg";
        req.flash('errors',[{msg:"No Image was selected"}]);
    }
    next();
},

checkImg: (req,res,next) =>{
    if (req.skip) {
        next();
    } else {
        
        req.files.profileImg.mv('./public/uploads/'+req.session.userProfileImage).then(()=>{
            console.log(req.session.userProfileImage);
        }).catch((error)=>{
            res.locals.redirect = "/profileimg";
            req.flash('message',[{msg:"Error uploading the image."}]);
            next(error);
        });
        //redirect success
        res.locals.redirect = "/profileimg";
        req.flash('success',[{msg:"Image successfully uploaded"}]);
        next();
    }
}

,
redirectView: (req,res,next)=>{
    console.log(req);
    let redirectView = res.locals.redirect;
    if(redirectView){
        res.redirect(redirectView);
  
    }
    next();
}

}


module.exports = userController;