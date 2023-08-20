console.log("Welcome!!");
// initialize the variables
let songindex=0;
let audioElement=new Audio("songs/0.mp3");
let masterplay=document.getElementById('masterplay');
let myprogress=document.getElementById('myprogress');
let songitem=Array.from(document.getElementsByClassName('songitem'));
let songs=[
    {songName: "kumkumala" , filePath:"songs/0.mp3" , coverPath:"images/song_cover.jpg"},
    {songName: "Maate Vinadhuga" , filePath:"songs/1.mp3" , coverPath:"images/song_cover.jpg"},
    {songName: "Nijame Ne Chebutunna" , filePath:"songs/2.mp3" , coverPath:"images/song_cover.jpg"},
    {songName: "Ninnu Chuse Anandamlo" , filePath:"songs/3.mp3" , coverPath:"images/song_cover.jpg"},
    {songName: "samajavaragamana" , filePath:"songs/4.mp3" , coverPath:"images/song_cover.jpg"},
    {songName: "Yedurangula Vaana" , filePath:"songs/5.mp3" , coverPath:"images/song_cover.jpg"},
]

// handle play/pause
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        makeallplays();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
})


songitem.forEach((element,i)=>{
   element.getElementsByTagName("img")[0].src=songs[i].coverPath;
   //element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})


// progress update
audioElement.addEventListener('timeupdate', ()=>{
    progress=parseInt(audioElement.currentTime/audioElement.duration*100);
    myprogress.value=progress;
})

myprogress.addEventListener('change', ()=>{
    audioElement.currentTime=myprogress.value*audioElement.duration/100;
})

// songs play/pause
const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeallplays();
        if(audioElement.paused || audioElement.currentTime<=0) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            songindex=parseInt(e.target.id);
            audioElement.src=songs[songindex].filePath;
            audioElement.currentTime=0;
            audioElement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause'); }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
        }    
    })
})

// next update
document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=5) {
        songindex=0;
    }
    else{
        songindex=songindex+1;
    }
    audioElement.src=songs[songindex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    makeallplays();
})
// previous update
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0) {
        songindex=0;
    }
    else{
        songindex=songindex-1;
    }
    audioElement.src=songs[songindex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    makeallplays();
})