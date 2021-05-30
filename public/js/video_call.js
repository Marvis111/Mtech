/* /when a user click on start chat
they should all send their stream to the group for
all other users to see including them..


*/
$(document).ready(function(){




});


$(document).on('click','.video_call',function(){

    let groupId = $('#groupId').val();
    const username = $('#userName').val();
    const userId = $('#userId').val();

    var peer = new Peer(userId,{
        host:'/',
        port:'3001'
    }); 
    startVideoCall(username,groupId,peer);
  //  socket.emit('join_vc',{groupId,username,userId});



});

function startVideoCall(username,groupId,peer){
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('videoContainer');
    //
    const vid_user = document.createElement('div');
    vid_user.classList.add('vid_user');
    //
    const span = document.createElement('span')
    span.classList.add('text-info');
    span.append(username);
    //
    const userVid = document.createElement('div');
   userVid.classList.add('userVid');
  //
  vid_user.append(span);
  videoContainer.append(vid_user);
  videoContainer.append(userVid);
  
  const vidGrid = $('#myvideo');
  const video = document.createElement('video');
  video.autoplay = true;
  //

  peer.on('open', function(userId) {
    var streamData;
    socket.emit('join_vc',{groupId,userId,username});
    
  navigator.mediaDevices.getUserMedia({
      audio:false,
      video:true
  }).then(stream =>{
    add_Video_Stream(video,stream,userVid);
//when im called..
peer.on('call', call =>{
call.answer(stream);
//
const videoContainer = document.createElement('div');
  videoContainer.classList.add('videoContainer');
  //
  const vid_user = document.createElement('div');
  vid_user.classList.add('vid_user');
  //
  const span = document.createElement('span')
  span.classList.add('text-info');
  span.append(username);
  //
  const userVid = document.createElement('div');
 userVid.classList.add('userVid');
//
vid_user.append(span);
videoContainer.append(vid_user);
videoContainer.append(userVid);

const vidGrid = $('#myvideo');
const video = document.createElement('video');
video.autoplay = true;
//
call.on('stream', user_video =>{
  add_Video_Stream(video,user_video,userVid);
  vidGrid.append(videoContainer);
});




});


    socket.on('join_vc', vc_data =>{
    connectToUsers(peer,vc_data.userId,stream,vc_data.username);


  });
  


    });
   
vidGrid.append(videoContainer);
//when you fnally join the vc, ion will sned all calls..
});

}

function connectToUsers(peer,userId,stream,username){
  const videoContainer = document.createElement('div');
      videoContainer.classList.add('videoContainer');
      //
      const vid_user = document.createElement('div');
      vid_user.classList.add('vid_user');
      //
      const span = document.createElement('span')
      span.classList.add('text-info');
      span.append(username);
      //
      const userVid = document.createElement('div');
     userVid.classList.add('userVid');
    //
    vid_user.append(span);
    videoContainer.append(vid_user);
    videoContainer.append(userVid);
    
    const vidGrid = $('#myvideo');
    const video = document.createElement('video');
    video.autoplay = true;

  const call =  peer.call(userId,stream);

  call.on('stream', userVideo =>{
    add_Video_Stream(video,userVideo,userVid);
  });
  
vidGrid.append(videoContainer);


}
function add_Video_Stream(video,stream,userVid){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
      
        video.play();
    });
    userVid.append(video);
};