import About from './About'
import Home from './Home'
import Help from './Help'
import Cart from './Cart'

function NavBar(){
    return <div className='flex gap-9 items-center text-white justify-center bg-pink-400 mt-10 ml-20 mr-20 p-3 rounded-xl' >
        <Home/>
        <About/>
        <Help/>
        <Cart/>

    </div>;

}

export default NavBar;