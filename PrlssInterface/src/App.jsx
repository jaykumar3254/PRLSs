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
                <div className="text-white mt-110 text-center bg-gradient-to-b from-transparent via-black/100 to-black p-36" >
                    <p className="text-4xl my-font" > We find house which feels home !</p>
                </div>
                <div className="pt-80 pb-50">
                    <Farman/>
                </div>
            </div>
            
        </div>
    );
}

export default App;