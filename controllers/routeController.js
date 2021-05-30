
const group = require('../models/group');

const routeController = {
    homePage: (req,res) =>{
        if(req.session.username && req.session.userId){
            res.redirect('/dashboard');
        }else{
        res.render('index');
        }
    },
    loginPage: (req,res)=>{
        if(req.session.username && req.session.userId){
            res.redirect('/dashboard');
        }else{
        res.render('registrations/login');
        }
    },
    signup: (req,res)=>{
        if(req.session.username && req.session.userId){
            res.redirect('/dashboard');
        }else{
        res.render('registrations/signup');
        }
    }
,
chat: (req,res,next)=>{
    if(req.session.username && req.session.userId && req.params.groupId){
        group.findOne({_id:req.params.groupId}).exec().then((grp)=>{
           let groupName = grp.name;
            res.render('chatpage',{groupName:groupName,
                groupId:req.params.groupId,userId:req.session.userId,userName:req.session.username});
            next();
        }).catch((error)=>{
            next(error);
        })
       
    }else{
        res.redirect('/registrations/login');
        next();
    }
    
},
dashboard:(req,res)=>{
    if(req.session.username && req.session.userId){
        group.find({}).exec().then(groups =>{
            console.log(groups);
            res.render('dashboard',
            {user:{username:req.session.username,userId:req.session.userId,groups:groups}});
        })
    }else{
        res.redirect('registrations/login');
    }
}
,
chatzone: (req,res,next) =>{
    const userId = req.body.userId,
    groupId = req.body.groupId;
    //session groupchat
    req.session.groupId = groupId;
    res.send(req.session.groupId);

},


newTeacher:(req,res,next) =>{
    console.log(req.body);
    next();
},



chatRoom: (req,res,next) =>{
    const room = req.params.groupId;
    
},
ajaxupload:(req,res,next) =>{
    console.log(req);
    const errors = {
        error:[],
        success:[]
    };

  if(req.files !== null ){
      const fileImage = req.files.profileImg;
      
      const allowedImgExt = ['jpg','png','jpeg'];
      //get the image name...
    const imgName =  fileImage.name;
    //split it .... into name, extension..
    const splitedImgName = imgName.split('.');
    // now get the img extension
    const imgExt = splitedImgName[splitedImgName.length - 1];
    //check if it is in allowed extension
    if( allowedImgExt.indexOf(imgExt) !== -1 ){
        //check the avatar file size...
        if(fileImage.size < 1000000){
            //file md5
            const file_md5_enc = fileImage.md5;
            //change file name..;
        const newFilename = file_md5_enc+"."+imgExt;
        //move file
        fileImage.mv('./public/uploads/'+newFilename).then(()=>{
            errors.success.push('Image Successfully uploaded.');
            res.send(errors);

        }).catch((error)=>{
            if(error){
                errors.error.push(error.message);
                res.send(errors);
            }
        })

        }else{
            errors.error.push('Image is too large.');
        res.send(errors);
        }
        
    }else{
        errors.error.push('Invalid Image Extension');
        res.send(errors);
    }
  }else{
      errors.error.push('No Image Selected');
     res.send(errors);
  }


}




}

module.exports = routeController;