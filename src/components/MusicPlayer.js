import { styled, Typography, Slider, Paper, Stack, Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastRewindIcon from '@mui/icons-material/FastRewind';

import furElise from '../assets/songs/10 - Fur Elise.mp3';
import dreamsTonite from '../assets/songs/02 - Dreams Tonite.mp3';

const Div = styled('div')(({theme})=>({
  backgroundColor: 'black',
  height:'100vh',
  width: '100vw',
  paddingTop: theme.spacing(6)

}))

const CustomPaper = styled(Paper)(({theme})=>({
backgroundColor: '#4c4c4c',
marginLeft: theme.spacing(6),
marginRight: theme.spacing(6),
padding: theme.spacing(2)

}))

const PSlider = styled(Slider)(({theme, ...props})=>({
color: 'silver',
height: 2,
'&:hover': {
  cursor: 'auto',
},
'& .MuiSlider-thumb': {
  width: '13px',
  height: '13px',
  display: props.thumbless ? 'none' : 'block',
}
}))


function MusicPlayer() {
  const audioPlayer = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState(furElise); 
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
if (audioPlayer){
  audioPlayer.current.volume = volume/100;
}

if (isPlaying) {
  setInterval(() => {
    const _duration = Math.floor(audioPlayer?.current?.duration);
    const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
    setDuration(_duration);
    setElapsed(_elapsed);
  }, 100);

}
  }, [volume, isPlaying ])

  function formatTime(time){
    if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
    const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
    return `${minutes}:${seconds}`;
  } else {
    return '00:00'
  }
}

  const togglePlay = () => {
    if(!isPlaying) {
    audioPlayer.current.play();
  } else {
    audioPlayer.current.pause();
  }
  setIsPlaying(prev => !prev)
}

function VolumeBtns(){
  return mute 
  ? <VolumeOffIcon sx={{color: 'silver', '&hover': {color: 'white'}}} onClick={()=>setMute(!mute)} />
  : volume <= 20 ? <VolumeMuteIcon sx={{color: 'silver', '&hover': {color: 'white'}}} onClick={()=>setMute(!mute)} />
  : volume <= 75 ? <VolumeDownIcon sx={{color: 'silver', '&hover': {color: 'white'}}} onClick={()=>setMute(!mute)} />
  : <VolumeUpIcon sx={{color: 'silver', '&hover': {color: 'white'}}} onClick={()=>setMute(!mute)} />
}





// stopped at 51 min







  return (
<Div>
<audio src={currentSong} ref={audioPlayer} muted={mute}/>

  <CustomPaper>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Stack direction='row' spacing={1} sx ={{display: 'flex', justifyContent: 'flex-start', width: '25%', alignItems: 'center'}}>
      <VolumeBtns />
      <PSlider min={0} max={100} value={volume} onChange={(e, v) => setVolume(v)} />
      </Stack>
      <Stack direction='row' spacing={1} sx={{ display: 'flex', width: '40%', alignItems: 'center' }}>
      <SkipPreviousIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} />
      <FastRewindIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} />
     
     {!isPlaying
    ?  <PlayArrowIcon fontSize={'large'} sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={togglePlay}/>
    :   <PauseIcon fontSize={'large'}  sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={togglePlay}/>
     }
     
      <FastForwardIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} />
      <SkipNextIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} />
      </Stack>

      <Stack sx={{display: 'flex', justifyContent: 'flex-end'}} />
      </Box>
      <Stack spacing={1} direction='row' sx={{display: 'flex', alignItems: 'center'}}>
      <Typography sx={{color: 'silver'}}>{formatTime(elapsed)}</Typography>
      <PSlider thumbless value={elapsed} max={duration}/>
      <Typography sx={{color: 'silver'}}>{formatTime(duration - elapsed)}</Typography>
      </Stack>
  </CustomPaper>
</Div>
  )
}
export default MusicPlayer;
