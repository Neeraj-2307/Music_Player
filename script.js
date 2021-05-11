//all the elements that we'll need
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//Song titles : created an array on song names
const songs = ['hey', 'summer', 'ukulele'];

//keep track of songs : song index will tell the current song to be played
let songIndex = 2;

//intitalially load song into DOM
loadSong(songs[songIndex]);

//update song details : sets the text, audio src and cover src
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
    
}
// we manually add a play class and added pause button and removed play button
//and also used the audion.play to actually play the song
function playSong() {
    musicContainer.classList.add('play') ;   //added a class in the html
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
//did the same thing but removes the play class and used the audio.pause to pause
//the playing song
function pauseSong(){
    musicContainer.classList.remove('play') ;   //added a class in the html
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}
//used to add functionality to the prev button and added the playsong function
//to play the song when we press this button 
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex >= songs.length){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//this function set the width of the progress element in accordance to the
//length of the song played by setting up the duration and currenttime and
//then seeting the progress percentage
function updateProgress(e) {
    const {duration, currentTime} = e.target;
    const progressPersent = (currentTime/duration) * 100;
    progress.style.width = `${progressPersent}%`;
}
//manually selecting the length of the song by clicking on the preogress tab
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event listeners
//checks wheather there is play class or not and if it is present then 
//calls pausesong else playsong
playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

//change song events
//all other event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);