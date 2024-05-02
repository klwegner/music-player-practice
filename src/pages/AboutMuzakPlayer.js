function AboutMuzakPlayer() {
    return(
        <div className="container">
        <h1 className="display-2 text-light">About This Project</h1>
        <p className="text-light">This was made for fun with React. I wanted to practice with React's useState and useEffect hooks.</p>
        <p className="text-light">Many tutorials were tried, but in the end Mathieu Media's video <a href='https://www.youtube.com/watch?v=CH2FmLzWKr4'>'Build Custom Audio Controls in React'</a> got me where I wanted to be--with a functioning music player with audio controls. One hundred thanks!
        <p className="text-light">This project was further enhanced by modifying the instructions to construct an audio context and connect with with a canvas to create a <a href="https://blog.logrocket.com/audio-visualizer-from-scratch-javascript/#building-the-visualizer"> visualizer.</a></p>
        <p className="text-light">Audio control icons were all sourced from <a href='https://mui.com/material-ui/material-icons/'>MUI</a>. Some styling was also created with certain components from MUI, namely the audio controls' design.</p>
        <p className="text-light">Lastly, I also decided I would finally mess around with <a href='https://getbootstrap.com/'>Bootstrap 4</a> and the <a href='https://animate.style/'>Animate.css library...</a>The results of which you have hopefully noticed in the headings and navbar.</p>
</p>
        </div>
    )
}
export default AboutMuzakPlayer;