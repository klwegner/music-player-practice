import PageTitle from "../components/PageTitle";
import MusicPlayer from "../components/MusicPlayer";
// import { useState, useRef } from 'react';
// import { SongList } from "../SongList";
import strobeLights from '../assets/pexels-pixabay-417458.jpg';

function HomePage(){
    return(
        <>
        <PageTitle/>
        <img className='mainPic' src={strobeLights} alt='strobe lights at music show'></img>
   <MusicPlayer/>
</>
    )
}

export default HomePage;