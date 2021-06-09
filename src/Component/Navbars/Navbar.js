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
    const history = useHistory();

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

    function choosePlant(plantID){
        let plant = plantDict[plantID.toString()]
        setCurrentPlant(plant)
        setDropDownValue(plant.name)
        console.log('Switching Plant View!')
        console.log(currentPlant)
    }

    useEffect(()=>{
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
                            <NavButton >Plant Settings</NavButton>
                        </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link to="/envcond" style={{ textDecoration: 'none' }}><NavButton >Environment Condition</NavButton>
                            </Link>
                        </li>

                        <li className={styles.nav__item}>
                            <Link to="/notification" style={{ textDecoration: 'none' }}><NavButton >Notifications</NavButton></Link> 
                        </li>
                        <li className={styles.nav__item}>
                            <Link to="/sehistory" style={{ textDecoration: 'none' }}><NavButton >History</NavButton>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <div onClick={handleLogout} style={{ textDecoration: 'none' }}><NavButton > Logout </NavButton></div>
                        </li>
                        </>
                        :
                        <>

                            {/* <Redirect to="/login"/> */}
                            <li className={styles.nav__item}>
                                <Link  to="/login" style={{ textDecoration: 'none' }}><NavButton>Login</NavButton></Link>
                            </li>

                            <li className={styles.nav__item}>
                                <Link to="/signup" style={{ textDecoration: 'none' }}><NavButton >Register</NavButton></Link> 
                            </li>
                        </>
                    }

                </ul>
            </nav>
        </header>
        <Switch>
        <PrivateRoute path ="/plant_settings" component={() => <PlantSetting key = {currentPlant.id} plant = {currentPlant} />}/>
        <PrivateRoute path="/notification" component={() => <Notification key = {currentPlant.id} plant = {currentPlant} />} />
        <PrivateRoute path="/envcond" component={() => <EnvCond key = {currentPlant.id} plant = {currentPlant} />} />
        <PrivateRoute path="/envhistory"><History items={historyData}/></PrivateRoute>
        <PrivateRoute path="/wathistory"><WateringHistory items={wateringData}/></PrivateRoute>
        <PrivateRoute path="/sehistory"><SelectHistory/></PrivateRoute>
        </Switch>
        </>)
}


const historyData = [
    {
      id: 'e1',
      description:'TEXT(Environment condition)',
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', description: 'TEXT(Environment condition)', date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      description:'TEXT(Environment condition)',
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      description:'TEXT(Environment condition)',
      date: new Date(2021, 5, 12),
    },
  ];
  const wateringData = [
    {
      id: 'e1',
      description:'Description',
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', description: 'Description', date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      description:'Description',
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      description:'Description',
      date: new Date(2021, 5, 12),
    },
  ];