import NavBar from "./Components/NavBar";
import Farman from "./Components/Farman";
import './Index.css'
import Earth from './earth.mp4'
import Map from './Components/Map'
import Footer from "./Components/Footer";

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
                <div className="text-white mt-80 text-center bg-gradient-to-b from-transparent via-black/100 to-black p-36" >
                    <p className="text-4xl my-font" > We find house which feels home !</p>
                    <p className="my-font text-l mt-5" >
                        Finding the right apartment is no longer just about location—it’s about how well a space aligns with your daily habits, preferences, and lifestyle patterns. Our intelligent relocation platform goes beyond traditional search by analyzing your past behavior and identifying the amenities you consistently rely on, whether it’s proximity to gyms, cafés, public transport, healthcare, or quiet green spaces. Instead of overwhelming you with generic listings, we curate a refined selection of apartments that closely match your personal usage patterns, ranked by relevance and convenience. By combining data-driven insights with real-world geographic intelligence, we help you transition into a new city seamlessly—minimizing uncertainty and maximizing comfort from day one. This is not just apartment hunting; it’s a smarter, personalized way to relocate, designed entirely around you.
                    </p>
                </div>
                <div className="pt-80 pb-50 flex ml-30 -mt-50">
                    <Map/>
                    <Farman/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>
    );
}

export default App;