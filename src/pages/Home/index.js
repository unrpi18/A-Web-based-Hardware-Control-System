import {useState} from "react";
import Item from "./components/Item";
import './index.css'


const Home = () => {
    const[data, setData] = useState([])


    return <div>

        <Item itemData={data}/>
    </div>
}

export default Home