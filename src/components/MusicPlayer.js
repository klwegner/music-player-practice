import { useEffect, useState, useRef } from 'react';
import { SongList } from '../SongList';





function MusicPlayer() {
    
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(true);
    const randomizer = Math.floor(Math.random() * (SongList.length - 1) + 1)
    const [songId, setSongId] = useState(randomizer);
    const [volume, setVolume] = useState(0.2);
    const timeLeft = Math.floor(duration) - Math.floor(position);
    const audioRef = useRef();
    
    

    function formatDuration(value){
        const minute = Math.floor(value/60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}: ${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
    }
    
    const handleGetAudioData = () => {
        audioRef.current.volume = localStorage.getItem('volume');
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    }
    
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setPosition(audioRef.current.currentTime)
        }
    
        if (timeLeft === 0) {
            handleSkipNext();
        }
    }
    
    
    const handlePlay = () => {
        
        if(paused) {
            audioRef.current.play();
            setPaused(false);
        } else {
            audioRef.current.pause();
            setPaused(true)
        }
    };
    
const handlePosition = (value) => {
    setPosition(value);
    audioRef.current.currentTime = position;
}

const handleRewind = () => {
    setPosition(audioRef.current.currentTime - 5);
    audioRef.current.currentTime -= 5;

    if (position <= 0) {
        setPosition(0);
    }
}

const handleForward = () => {
    setPosition(audioRef.current.currentTime + 5);
    audioRef.current.currentTime += 5;

    if (position >= duration) {
        setPosition(duration);
    }
}

const handleSkipNext = () => {
    if (songId < SongList.length) {
        setSongId(songId + 1);
    }
    if (songId === SongList.length) {
        setSongId(1);
    }
    audioRef.current.load();

    setTimeout(()=> {
audioRef.current.play();
    }, 1000)
}

const handleSkipPrevious = () => {
    if (songId > 1) {
        setSongId(songId - 1);
    }
    if (songId === 1) {
        setSongId(SongList.length);
    }
    audioRef.current.load();
    audioRef.current.play();
}

const handleVolume = (event, newVolume) => {
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume);
    audioRef.current.volume = newVolume;
}

useEffect(()=>{
    localStorage.setItem('volume', 0.2);
},[])

return (
<div class="container">
    <audio id='audio' preload='audio' ref = {audioRef} onLoadedMetadata={handleGetAudioData} onTimeUpdate={handleTimeUpdate}>
        <source src={SongList.find(x => x.id === songId).source} type='audio/mp3'></source>
    </audio>
    <h1>{SongList.find(x=>x.id===songId).title}</h1>
    <h4>{formatDuration(position)}</h4>
                    <h4>-{formatDuration(duration - position)}</h4>
    <h2>{SongList.find(x=>x.id===songId).artist}</h2>
    <img alt={SongList.find(x=>x.id===songId).cover}
     src={SongList.find(x=>x.id===songId).cover} />
<button onClick={handlePlay}>Pause</button>
<button onClick={handlePlay}>Play</button>
<button onClick={handleForward}>FF</button>
<button onClick={handleRewind}>Rewind</button>
<button onClick={handleSkipNext}>Next</button>
<button onClick={handleSkipPrevious}>Previous</button>

    </div>


)
}
export default MusicPlayer;