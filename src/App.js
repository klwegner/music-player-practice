import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import PageTitle from './components/PageTitle';
import NavBar from './components/NavBar';
import AboutKristen from './pages/AboutKristen';
import AboutMuzakPlayer from './pages/AboutMuzakPlayer';


function App() {
  return (
    <div className="App">
<PageTitle/>
    <NavBar/>
    <Routes>
<Route path='/aboutKristen' component={AboutKristen} />
<Route path='/aboutMuzakPlayer' component={AboutMuzakPlayer} />
    </Routes>
    </div>
  );
}

export default App;
