import { styled, Typography, Box } from '@mui/material';
import { useRef, useEffect, useState } from 'react';



const CanvasArea = styled('div')(({theme})=>({
    width: '80%',
    height: '75vh',
    margin: '0 10%',
    backgroundColor:'grey',
display:'flex',
justifyContent:'center'
  }))

  function Canvas({ currentSong }){
    const canvasRef = useRef(null);
    const [audio, setAudio] = useState(null);
    const audioCtx = useRef(null);


    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

audioSource = audioCtx.createMediaElementSource(audio);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);


useEffect(()=>{
    //what variable name goes here?
    if (currentSong) {
const newAudio = new Audio();
newAudio.src = currentSong;
setAudio(newAudio);
    
if (audioCtx.current) {
    audioCtx.current.close();
  }
  
  if(audio){
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    audioSource = audioCtx.current.createMediaElementSource(audio);
    analyser = audioCtx.current.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.current.destination);

  }
}
}, [currentSong])

useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Your canvas drawing logic using ctx here
    }
  }, [canvasRef]);



return(
    <CanvasArea>
    <canvas ref={canvasRef}/>
    <Box>
    <Typography>Hi there</Typography>
    </Box>
    </CanvasArea>
)

  }

  export default Canvas;