const routeController = require('../controllers/routeController');
const userController = require('../controllers/userController');

const routes = (app) =>{
    
    app.get('/',routeController.homePage);
    app.get('/registrations/login', routeController.loginPage);
    app.get('/registrations/signup',routeController.signup);
    //post
    app.post('/registrations/signup',userController.checkInput,userController.validateInput,userController.saveNewUser,userController.redirectView);
    app.post('/registrations/login',userController.checkData,userController.validateData,userController.Auth,userController.redirectView);
    app.get('/chat/:groupId',routeController.chat);
    app.get('/dashboard',routeController.dashboard);
    app.get('/video',(req,res)=>{
        res.render('video');
    });
    app.get('/profileimg',userController.profileImg, userController.redirectView);

    app.post('/chatzone', routeController.chatzone);
    app.post('/uploads',userController.uploads,userController.checkImg ,userController.redirectView);



    app.post('/hello',routeController.ajaxupload);
    app.post('/teacher',routeController.newTeacher);
  //  app.get('/chat/:groupId',routeController.chatRoom);
};


module.exports = routes;