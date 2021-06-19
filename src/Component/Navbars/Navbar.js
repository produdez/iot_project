import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../../Context/AuthContext";
import NavButton from '../Buttons/NavButton.js';
import styles from './Navbar.module.css'
import {Link,useHistory,  Redirect,Switch} from 'react-router-dom';
import { auth } from "../../firebase"
import {NavDropdown, DropdownButton} from 'react-bootstrap'
import PrivateRoute from "../../API/PrivateRouteHelper"

import PlantSetting from '../Pages/PlantSetting'

import EnvCond from "../EnvCond";
import History from "../Pages/HistoryPage"
import Notification from "../Notification"
import firebase from "firebase/app"
import SelectHistory from "../Pages/selectHistory"
import WateringHistory from "../Pages/WateringHistory"
import WaterIcon from "./WaterIcon"
import NavEnvCond from "./NavEnvCond";

const DUMMY_PLANT_DICT = {
    '1' : {id:1 ,name: 'Plant 1', waterMode:true, waterAmount:10, minimumMoisture: 50, timeInterval: '1 day', operational: true},
};

const ref = firebase.database().ref('Plant').orderByChild('plant_id').limitToLast(10);
export default function Navbar(){
    // console.log(localStorage.getItem('user-info'));
    const { currentUser } = useAuth();
    const [value,setValue] = useState();
    const [error, setError] = useState("")
    const [dropDownValue, setDropDownValue] = useState("Plant 1")
    const [plantDict, setPlantDict] = useState(DUMMY_PLANT_DICT)
    const [currentPlant, setCurrentPlant] = useState(plantDict['1']);
    const [currentPath, setCurrentPath] = useState('/envcond')
    const history = useHistory();
    const [isActive, setActive] = useState({plantSetting:false,envCond:false,noti:false,history:false});
    async function handleLogout() {
        // setValue({});
        setError("")
        // console.log('User after logout: ',currentUser)

        try {
          await auth.signOut()
          history.push("/login")
          
        } catch {
          setError("Failed to log out")
        }
    }

    const activeButtonHandler1 = () => {
        setActive({...isActive,plantSetting:true,envCond:false,noti:false,history:false});
    }
    const activeButtonHandler2 = () => {
        setActive({...isActive,plantSetting:false,envCond:true,noti:false,history:false});
    }
    const activeButtonHandler3 = () => {
        setActive({...isActive,plantSetting:false,envCond:false,noti:true,history:false});
    }
    const activeButtonHandler4 = () => {
        setActive({...isActive,plantSetting:false,envCond:false,noti:false,history:true});
    }

    function choosePlant(plantID){
        let plant = plantDict[plantID.toString()]
        setCurrentPlant(plant)
        setDropDownValue(plant.name)
        console.log('Switching Plant View!')
        console.log(currentPlant)
    }


    useEffect(()=>{
        history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            setCurrentPath(location.pathname)
        })
        ref.on('value', function (snapshot) {
            let json = snapshot.val()
            // console.log('Plant List from fb: ')
            var dict = {};
            Object.entries(json).forEach(([key, value]) => {
                dict[value.id.toString()] = value
            });
            setPlantDict(dict)
            // console.log('Plant dict: ', plantDict)
        })
    }, []) // <-- empty dependency array
    
    const [count, setCount] = useState(1)
    return(
        <>
        <header className={styles.header}>
            <nav className={styles.nav}>
            <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                {currentUser ? null : <div className={styles.nav__logo}>Irrigation System</div>}
                </Link>
                <ul className={styles.nav__links}>
                    {
                        (currentUser)?
                            <>
                            <WaterIcon key = {currentPlant.id} plant = {currentPlant} ></WaterIcon>
                            
                            <NavDropdown className={styles.nav_drop} title={
                                    <span className="color-dark my-auto" style={{color:'black' }}>{dropDownValue}</span>
                                }>
                                {Object.values(plantDict).map(function (plant){
                                    return (<NavDropdown.Item ><div 
                                    onClick={() => choosePlant(plant.id)}
                                    key={plant.id}
                                    >{plant.name}</div></NavDropdown.Item>)
                                })}
                                {/* <NavDropdown.Item ><div onClick={(e)=>setDropDownValue(e.target.textContent)}>Plant 1</div></NavDropdown.Item>
                                <NavDropdown.Item ><div onClick={(e)=>setDropDownValue(e.target.textContent)}>Plant 2</div></NavDropdown.Item>
                                <NavDropdown.Item disabled>Plant 3</NavDropdown.Item> */}
                            </NavDropdown>
                            </>
                            :
                            null
                    }

                    {
                        (currentUser)?
                        <>
                        {
                            (currentUser)? null:
                            <li className={styles.nav__item}>
                            <Link to="/" style={{ textDecoration: 'none' }}><NavButton >Home</NavButton>
                            </Link>
                            </li>
                        }
                        
                        <li className={styles.nav__item}>
                        <Link to="/plant_settings" style={{ textDecoration: 'none' }}>
                            <NavButton isActive={isActive.plantSetting} onClick={() => activeButtonHandler1()}>Plant Settings</NavButton>
                        </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link to="/envcond" style={{ textDecoration: 'none' }}><NavButton isActive={isActive.envCond} onClick={() => activeButtonHandler2()}>Environment Condition</NavButton>
                            </Link>
                        </li>

                        <li className={styles.nav__item}>
                            <Link to="/notification" style={{ textDecoration: 'none' }}><NavButton isActive={isActive.noti} onClick={() => activeButtonHandler3()}>Notifications</NavButton></Link> 
                        </li>
                        <li className={styles.nav__item}>
                            <Link to="/envhistory" style={{ textDecoration: 'none' }}><NavButton isActive={isActive.history} onClick={() => activeButtonHandler4()}>History</NavButton>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <div onClick={handleLogout} style={{ textDecoration: 'none' }}><NavButton> Logout </NavButton></div>
                        </li>
                        </>
                        :
                        <>

                            {/* <Redirect to="/login"/> */}
                            <li className={styles.nav__item}>
                                <Link  to="/login" style={{ textDecoration: 'none' }}><NavButton>Login</NavButton></Link>
                            </li>

                            <li className={styles.nav__item}>
                                <Link to="/signup" style={{ textDecoration: 'none' }}><NavButton>Register</NavButton></Link> 
                            </li>
                        </>
                    }

                </ul>
            </nav>
            {
                
                (currentUser)?(currentPath === '/envcond')?null:
                <nav className={styles.nav2}>
                <NavEnvCond key = {currentPlant.id} plant = {currentPlant} />
                </nav> : null
            }
            
            
        </header>
        <Switch>
        <PrivateRoute path ="/plant_settings" component={() => <PlantSetting key = {currentPlant.id} plant = {currentPlant} />}/>
        <PrivateRoute path="/notification" component={() => <Notification key = {currentPlant.id} plant = {currentPlant} />} />
        <PrivateRoute path="/envcond" component={() => <EnvCond key = {currentPlant.id} plant = {currentPlant} />} />
        <PrivateRoute path="/envhistory" component={() => <History key = {currentPlant.id} plant = {currentPlant} />}></PrivateRoute>
        <PrivateRoute path="/wathistory" component={() => <WateringHistory key = {currentPlant.id} plant = {currentPlant} />}></PrivateRoute>
        <PrivateRoute path="/sehistory"><SelectHistory/></PrivateRoute>
        </Switch>
        </>)
}