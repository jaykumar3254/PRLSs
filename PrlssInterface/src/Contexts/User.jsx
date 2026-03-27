import { Children, createContext, useState } from "react";
import axios from 'react';
const userContext = createContext();

function provider({Children}){

    const [user,setUser] = useState([]);

    const createUser = async (title) => {
        const ressponse = await axios.post('http://localhost:3001/book',{
            title,
        });
        setUser([...user,ressponse.data]);
    }
    
    return( <userContext.Provider value={{user,createUser}} >
    {Children}
    </userContext.Provider>);

};

export {provider};
export default userContext;
