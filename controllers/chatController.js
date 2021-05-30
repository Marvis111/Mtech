const room = require('../models/room');
const moment = require('moment');

//notifier

const notifier = require('node-notifier');

const sendNotification = (username,userId) =>{
    notifier.notify({
        title:"New User Joined",
        message:`${username} just joined the group`,
        reply:true,
        icon:'images/marviskid.jpg'
    });
}

const io = io =>{

    io.on('connection', socket =>{
        //when user joins a room
        socket.on('joinRoom',({userId,username,groupId})=>{   
        socket.join(groupId);

       
        

socket.broadcast.to(groupId).emit('welcome',
{message: `${username} joined the group`,
sendNotify:sendNotification(username,userId)
});

//fetch group data...
//fetch the group messge..
room.find({groupId:groupId}).exec().then((groupData)=>{
    io.to(groupId).emit('load_groupMessages',groupData);
}).catch((error)=>{
    console.log(error);
});

//response to sendMessage event...
socket.on('sendMessage',({username,userMsg})=>{
    let messageBody = {
        groupId:groupId,
        userId:userId,
        username:username,
        user_message:userMsg,
        msg_time: moment().format("Y:m h:mm a")
    };
    room.create(messageBody).then((user)=>{
        io.to(groupId).emit('sendMessage',[messageBody]);
    }).catch(error=>{
        console.log(error);
    })

});
//{groupId,userId,username}
//video calling...
socket.on('join_vc',vc_data =>{
    io.to(vc_data.groupId).emit('join_vc',vc_data);
});
// typing...
socket.on('user_typing',(user)=>{
    socket.broadcast.to(user.groupId)
    .emit('user_typing', user);
});









});
        

        

    });
   
};

module.exports = io;


