import About from './About'
import Home from './Home'
import Help from './Help'
import Cart from './Cart'

function NavBar(){
    return <div className='flex gap-40 items-center text-white justify-center bg-transparent border border-white p-5 mt-10 ml-30 mr-30 rounded-xl' >
        <Home/>
        <About/>
        <Help/>
        <Cart/>

    </div>;

}

export default NavBar;