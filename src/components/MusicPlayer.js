import { useState } from 'react';
import { SongList } from '../../SongList';





function MusicPlayer() {

    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(true);
    const randomizer = Math.floor(Math.random() * (SongList.length - 1) + 1)
    const [songId, setSongId] = useState(randomizer);
    const [volume, setVolume] = useState(0.2);
    let audioRef;
    let timeLeft;
    let handleSkipNext;

const handlePlay = () => {

    if(paused) {
        audioRef.current.play();
        setPaused(false);
    } else {
        audioRef.current.pause();
        setPaused(true)
    }
};

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

const handleTimeUpdate = () => {
    if (audioRef.current) {
        setPosition(audioRef.current.currentTime)
    }

    if (timeLeft === 0) {
        handleSkipNext();
    }
}

const handlePosition = (value) => {
    setPosition(value);
    audioRef.current.currentTime = position;
}

return (

    <audio id='audio' preload='audio' ref = {audioRef} onLoadedMetadata={handleGetAudioData} onTimeUpdate={handleTimeUpdate}>
        <source src={SongList.find(x => x.id === songId).source} type='audio/mpeg'></source>
    </audio>


)
}
export default MusicPlayer;