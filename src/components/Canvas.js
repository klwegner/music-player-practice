import { useEffect, useRef } from "react";
import { styled } from "@mui/material";


const Canvas = ({ isPlaying, currentSong, audioPlayer, audioCtx, audioSource, playlist, setIndex, analyser, startAnimation }) => {
    const canvasRef = useRef(null);

    const animationFrameId = useRef(null);

  const CanvasArea = styled("div")(({ theme }) => ({
    width: "100%",
    // height: "auto",
    height: "calc(100vh - 175px)",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    //  border: "10px solid pink"
  }));

  const handleNextSong = () => {
    setIndex((prevIndex) => {
      const nextIndex = prevIndex >= playlist.length - 1 ? 0 : prevIndex + 1;
      audioPlayer.current.src = playlist[nextIndex];
      audioPlayer.current.play();
      return nextIndex;
    });
  };
  

  const animate = () => {
    const ctx = canvasRef.current.getContext("2d");
    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    const barWidth = canvasRef.current.width / dataArray.length;

    const colors = ["#474F7A", "#81689D", "#FFD0EC", "#1F2544"];
    let colorIndex = 0;

    const draw = () => {
      analyser.current.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      let x = 0;
      dataArray.forEach((value) => {
        const barHeight = value;
        ctx.fillStyle = colors[colorIndex];
        ctx.fillRect(
          x,
          canvasRef.current.height - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
        colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors
      });
      animationFrameId.current = requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (startAnimation) {
      animate();
    } else {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, [startAnimation]);


  //animates if audio is playing; calls handleNextSong when song ends, allows for pause to erase canvas
  useEffect(() => {
    const playAudio = () => {
      audioPlayer.current.play();
      animate();
    };

    if (isPlaying) {
      audioCtx.current
        .resume()
        .then(playAudio)
        .then(() => {
          audioPlayer.current.addEventListener("ended", handleNextSong);
          playAudio();
        })
        .catch((error) => {
          console.error("Failed to resume AudioContext:", error);
        });
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationFrameId.current);
    }
  }, [isPlaying]);

    //enables animation based on current song
    useEffect(() => {
        if (currentSong && audioCtx.current) {
          if (!audioSource.current) {
            audioSource.current = audioCtx.current.createMediaElementSource(
              audioPlayer.current
            );
            audioSource.current.connect(analyser.current);
            analyser.current.connect(audioCtx.current.destination);
          }
          if (canvasRef.current) {
            animate();
          }
        }
        return () => {
          if (audioCtx.current) {
            audioCtx.current.close();
          }
        };
      }, [currentSong]);

  
  return (
    <CanvasArea>
    <canvas ref={canvasRef} style={{ width: "100%" }} />
  </CanvasArea>
  );
};

export default Canvas;