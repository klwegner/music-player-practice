import PageTitle from "../components/PageTitle";
import MusicPlayer from "../components/MusicPlayer";
import { useState, useRef } from 'react';
import { SongList } from "../SongList";

function HomePage(){
    const [songs, setSongs] = useState(SongList);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(SongList[0]);
    const audioElem = useRef();

    return(
        <>
        <br>
        </br>
        <br></br>
        <PageTitle/>
        <audio src='./assets/songs/02 - Dreams Tonite.mp3' ref= {audioElem}/>
   <MusicPlayer songs = {songs} setSongs = {setSongs} isPlaying = {isPlaying} setIsPlaying = {setIsPlaying} audioElem = {audioElem} />
</>
    )
}

export default HomePage;