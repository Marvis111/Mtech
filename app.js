const express = require('express'),
expressSession = require('express-session'),
bodyParser = require('body-parser'),
connectFlash = require('connect-flash'),
cookieParser = require('cookie-parser'),
http = require('http');
const upload = require('express-fileupload');
//
const app = express();
/*
*/

//@ set
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');
//@endset
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
//app.use(bodyParser.urlencoded({extended:false}));
app.use(upload());
app.use(cookieParser());
app.use(expressSession({
    secret:'secret_password',
    cookie:{
        maxAge:50000000
    },
    resave:false,
    saveUninitialized:false
}))

app.use(connectFlash());
// use flash messages
app.use((req,res,next) =>{
    res.locals.flashMessages = req.flash();
    next();
});
// handle all incoming errors

//routes..
const routes = require('./routes/routers');

//let the router use the app
routes(app);

//

 const server = app.listen(app.get('port'),()=>{
     console.log('Server running on port '+ app.get('port'));
 });
 // making use of socket.io
const io = require('socket.io')(server);
require('./controllers/chatController')(io);
