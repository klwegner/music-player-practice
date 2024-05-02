import "animate.css";

function PageTitle() {
  return (
    <div
      className="container bg-transparent animate__animated animate__fadeInLeft animate__slower animate__fadeOutRight animate__slower"
      style={{
        animationDelay: "2s",
        position: "fixed",
        top: 50,
        left: 0,
        width: "100%",
      }}
    >
      <h1 className="display-1">The Muzak Player</h1>
      <h1 className="display-4">Playing some of Kristen's favorite tunes</h1>
    </div>
  );
}
export default PageTitle;
