import NavBar from "./Components/NavBar";
import Farman from "./Components/Farman";
import './Index.css'
import Earth from './earth.mp4'

function App(){
    return(

        <div>
            <div>
                <video autoPlay loop muted playsInline className="video-bg">
                    <source src={Earth} type="video/mp4" />
                </video>
            </div>
            <div>
                <div className="" >
                    <NavBar/>
                </div>
                <div className="text-white mt-170 text-center" >
                    <p> we find home which feels home  </p>
                </div>
                <div>
                    <Farman/>
                </div>
            </div>
        </div>
    );
}

export default App;