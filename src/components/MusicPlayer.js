import { styled, Typography, Slider, Paper, Stack, Box } from '@mui/material';


import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';


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
  height: '13px'
}
}))


function MusicPlayer() {


  return (
<Div>
  <CustomPaper>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Stack direction='row' spacing={1} sx ={{display: 'flex', justifyContent: 'flex-start', width: '25%', alignItems: 'center'}}>
        <VolumeDownIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} />
        <PSlider />
      </Stack>
      <Stack direction='row' spacing={1} sx={{ display: 'flex', width: '40%', alignItems: 'center' }}>
      <SkipPreviousIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} />



{/* 
used https://www.youtube.com/results?search_query=react+music+player+tutorial
stopped at 15:10 */}





      </Stack>
    </Box>
  </CustomPaper>
</Div>
  )
}
export default MusicPlayer;
