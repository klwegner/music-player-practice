import { useState, useEffect } from 'react';
import 'animate.css';

function PageTitle() {

    // const [isVisible, setIsVisible] = useState(true); // State to control visibility

    // useEffect(() => {
    //   const timeout = setTimeout(() => setIsVisible(false), 2000); // Hide after 2 seconds
  
    //   return () => clearTimeout(timeout); // Cleanup function to clear timeout on unmount
    // }, []); 


    return(
                // <div className="container bg-transparent" style={{  zIndex: 10, display: isVisible ? 'block' : 'none' }}>

        <div className="container bg-transparent animate__animated animate__fadeInLeft animate__slower animate__fadeOutRight animate__slower" style={{ animationDelay: '2s', position: 'fixed', top: 50, left: 0, width: '100%'}}>
{/* <h1 className="display-1 animate__animated animate__backInDown">The Muzak Player</h1>
<h1 className="display-4 animate__animated animate__backInLeft">Playing some of Kristen's favorite tunes</h1> */}

<h1 className="display-1">The Muzak Player</h1>
<h1 className='display-4'>Playing some of Kristen's favorite tunes</h1>

</div>
    )
}
export default PageTitle;