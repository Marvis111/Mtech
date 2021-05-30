/*

function outputVid(){
const vidGrid = $('#myvideo');
const video = document.createElement('video');
video.autoplay = true;
video.controls = true
navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
    }).then(stream =>{
        video.srcObject = stream;
        video.addEventListener('loadedmetadata',function(){
            video.autoplay();
        })    
vidGrid.append(video);
    })
}


*/