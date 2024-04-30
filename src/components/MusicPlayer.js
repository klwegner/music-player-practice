import { styled, Typography, Slider, Paper, Stack, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";

import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import FastRewindIcon from "@mui/icons-material/FastRewind";

import furElise from "../assets/songs/10 - Fur Elise.mp3";
import dreamsTonite from "../assets/songs/02 - Dreams Tonite.mp3";
import forgetAboutLife from "../assets/songs/10 - Forget About Life.mp3";

const Div = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100vw",
  paddingTop: theme.spacing(2),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "black",
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2),
}));

const PSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "silver",
  height: 2,
  "&:hover": {
    cursor: "auto",
  },
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
    display: props.thumbless ? "none" : "block",
  },
}));

const CanvasArea = styled("div")(({ theme }) => ({
  width: "80%",
  height: "75vh",
  margin: "0 10%",
  backgroundColor: "grey",
  display: "flex",
  justifyContent: "center",
}));

const playlist = [furElise, dreamsTonite, forgetAboutLife];

function MusicPlayer() {
  const audioPlayer = useRef();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState(playlist[index]);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  //new

  const canvasRef = useRef(null);
  const audioCtx = useRef(null);
  const audioSource = useRef(null);
  const analyser = useRef(null);
  const animationFrameId = useRef(null);

  // let x = 0;
  // const ctx = canvasRef.current?.getContext("2d");

  //new

  useEffect(() => {
    const playAudio = () => {
      audioPlayer.current.play();
      animate();
    };
    if (isPlaying) {
      audioCtx.current
        .resume()
        .then(playAudio)
        .catch((error) => {
          console.error("Failed to resume AudioContext:", error);
        });
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationFrameId.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [volume, isPlaying]);

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

  const animate = () => {
    const ctx = canvasRef.current.getContext("2d");
    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    const barWidth = canvasRef.current.width / dataArray.length;

    const draw = () => {
      analyser.current.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      let x = 0;
      dataArray.forEach((value) => {
        const barHeight = value;
        ctx.fillStyle = "white";
        ctx.fillRect(
          x,
          canvasRef.current.height - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      });
      animationFrameId.current = requestAnimationFrame(draw);
    };
    draw();
  };

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    } else {
      return "00:00";
    }
  }

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioCtx.current) {
        // Create the AudioContext if it doesn't exist
        audioCtx.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      if (!audioSource.current) {
        // Create the audio source and connect it to the analyser
        audioSource.current = audioCtx.current.createMediaElementSource(
          audioPlayer.current
        );
        if (!analyser.current) {
          analyser.current = audioCtx.current.createAnalyser();
        }
        audioSource.current.connect(analyser.current);
        analyser.current.connect(audioCtx.current.destination);
      }
      audioCtx.current
        .resume()
        .then(() => {
          audioPlayer.current.play();
          animate();
        })
        .catch((error) => {
          console.error("Failed to resume AudioContext:", error);
        });
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationFrameId.current);
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 10;
  };

  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };

  const toggleSkipForward = () => {
    if (index >= playlist.length - 1) {
      setIndex(0);
      audioPlayer.current.src = playlist[0];
      audioPlayer.current.play();
    } else {
      setIndex((prev) => prev + 1);
      audioPlayer.current.src = playlist[index + 1];
      audioPlayer.current.play();
    }
  };

  const toggleSkipBackward = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      audioPlayer.current.src = playlist[index - 1];
      audioPlayer.current.play();
    }
  };

  function VolumeBtns() {
    return mute ? (
      <VolumeOffIcon
        sx={{ color: "silver", "&hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        sx={{ color: "silver", "&hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        sx={{ color: "silver", "&hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    ) : (
      <VolumeUpIcon
        sx={{ color: "silver", "&hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    );
  }

  return (
    <>
      <CanvasArea>
        <canvas ref={canvasRef} />
      </CanvasArea>
      <Div>
        <audio src={currentSong} ref={audioPlayer} muted={mute} />

        <CustomPaper sx={{ width: "100%", marginLeft: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: { sm: "center", md: "flex-start" },
                width: { xs: "100%", md: "25%" },
                alignItems: "center",
              }}
            >
              <VolumeBtns />
              <PSlider
                min={0}
                max={100}
                value={volume}
                onChange={(e, v) => setVolume(v)}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: "flex",
                width: { xs: "100%", md: "40%" },
                alignItems: "center",
                justifyContent: { xs: "space-between", md: "flex-start" },
              }}
            >
              <SkipPreviousIcon
                sx={{ color: "silver", "&:hover": { color: "white" } }}
                onClick={toggleSkipBackward}
              />
              <FastRewindIcon
                sx={{ color: "silver", "&:hover": { color: "white" } }}
                onClick={toggleBackward}
              />

              {!isPlaying ? (
                <PlayArrowIcon
                  fontSize={"large"}
                  sx={{ color: "silver", "&:hover": { color: "white" } }}
                  onClick={togglePlay}
                />
              ) : (
                <PauseIcon
                  fontSize={"large"}
                  sx={{ color: "silver", "&:hover": { color: "white" } }}
                  onClick={togglePlay}
                />
              )}

              <FastForwardIcon
                sx={{ color: "silver", "&:hover": { color: "white" } }}
                onClick={toggleForward}
              />
              <SkipNextIcon
                sx={{ color: "silver", "&:hover": { color: "white" } }}
                onClick={toggleSkipForward}
              />
            </Stack>

            <Stack sx={{ display: "flex", justifyContent: "flex-end" }} />
          </Box>
          <Stack
            spacing={1}
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ color: "silver" }}>
              {formatTime(elapsed)}
            </Typography>
            <PSlider thumbless="true" value={elapsed} max={duration} />
            <Typography sx={{ color: "silver" }}>
              {formatTime(duration - elapsed)}
            </Typography>
          </Stack>
        </CustomPaper>
      </Div>
    </>
  );
}

export default MusicPlayer;
