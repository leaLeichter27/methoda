import React , {useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/index";

interface IHome {
}

const Home = ({}:IHome): JSX.Element => {
    const dispatch = useDispatch();
    
    return (
        <div style={{display:'flex'}}>
            Home
        </div>
    )
}

export default Home;