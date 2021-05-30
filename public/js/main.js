const socket = io();

$(document).ready(function(){
  // call on the notifier...

    //
    const userId = $('#userId').val();
    const username = $('#userName').val();
    const groupId = $("#groupId").val();
//when user joins group.
    socket.emit('joinRoom',{userId,username,groupId});
    //on welcome
      socket.on('welcome',messageBdy=>{
        //notify
        //
        let groupId = $('#groupId').val();
        let msgArea = $('.chat-arena');
        msgArea.prepend(`
  
<div class="alert alert-success  alert-dismissible fixed-notification " style="width:96%;margin:5px auto">
  <button type="button" class="close" data-dismiss="alert">
  &times;</button>
  <strong>${messageBdy.message}</strong>
</div>
        `);


    });
//load messages..
  //  socket.emit('load_groupMessages',groupId);
//on load group messagess..
      socket.on('load_groupMessages',groupData =>{
        fetch_groupData(groupData);
    });
    socket.on('sendMessage',messageBody=>{
        fetch_AppendgroupData(messageBody);
      });
      //typing
      socket.on('user_typing', typing =>{
        emitTypingNotification(typing);
    });
    
      
});

//@end welcome

//
$(document).on('click','.send',function(){
    var userMsg = $('#userMsg').val();
    var username = $('#userName').val();
    socket.emit('sendMessage',{
        username:username,
        userMsg:userMsg
    });
    $('#userMsg').val('');
})
 /* LOAD ALL MESSAGES..*/
function fetch_groupData(groupData){
    const session_user = $('#userName').val();
    let msgarena = $('.chat-messages');
    var outPut="";
    groupData.forEach(user => {
        if(user.username == session_user ){
           outPut += `<div class="to-message">
            <div class="to-message-body">
             <strong style="color:green">  ${user.username} </strong>
              <p>
               ${user.user_message}
              </p>
            </div>
            <div class="to-user-Img">
              <img src="../images/marviskid.jpg">
            </div>
            <span class="to-message-date">${user.msg_time}</span>
          </div>`;
        }else{
          outPut += `<div class="from-message">
            <div class="message-body">
             <strong style="color:blue">   ${user.username} </strong>
              <p>
              ${user.user_message}
              </p>
            </div>
            <div class="user-Img">
              <img src="../images/marviskid.jpg">
            </div>
            <span class="message-date">${user.msg_time}</span>
        
          </div>`
        }

    
        msgarena.html(outPut);
        msgarena.animate({
            scrollTop:$(this).height() * 10000000
        })
    });
}
//@end load function...
//@endLoad
/*  send message... */


/** append current messages.. */
function fetch_AppendgroupData(groupData){
    const session_user = $('#userName').val();
    let msgarena = $('.chat-messages');   
     groupData.forEach(user => {
        if(user.username == session_user ){
           msgarena.append(`<div class="to-message">
            <div class="to-message-body">
             <strong style="color:green">  ${user.username} </strong>
              <p>
               ${user.user_message}
              </p>
            </div>
            <div class="to-user-Img">
              <img src="../images/marviskid.jpg">
            </div>
            <span class="to-message-date">${user.msg_time}</span>
          </div>`);
        }else{
         msgarena.append(`<div class="from-message">
            <div class="message-body">
             <strong style="color:blue">   ${user.username} </strong>
              <p>
              ${user.user_message}
              </p>
            </div>
            <div class="user-Img">
              <img src="../images/marviskid.jpg">
            </div>
            <span class="message-date">${user.msg_time}</span>
        
          </div>`);
        }
         msgarena.animate({
            scrollTop:$(this).height() * 10000000
        })
    });
}
/* on type message.. */
//mesg-area
$(document).on('focus','.mesg-area',function(){
 if($(this).val() != ""){
    const userId = $('#userId').val();
    const username = $('#userName').val();
    const groupId = $("#groupId").val();
    socket.emit('user_typing',{username,groupId,userId});
   
 }
})
//emit the user_typing event...
 function emitTypingNotification(typing){
    let msgarena = $('.chat-messages');   
    const typ_user = typing.username;
    msgarena.append(`<div class="from-message">
            <div class="message-body">
             <strong style="color:blue">   ${typ_user} </strong>
              <p>
     <div class="container">
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
	</div>
    </p>
            </div>
            <div class="user-Img">
              <img src="../images/marviskid.jpg">
            </div>
            <span class="message-date"></span>
          </div>`);
};