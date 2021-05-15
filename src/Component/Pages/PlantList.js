import React, {Component,useState} from 'react';
import Navbar from '../Navbars/Navbar'
import classes from './PlantList.module.css'
import Plant from '../Plant.js';


const PlantList = props => {
    const Plants = [
        {id:1 ,name: 'Plant 1', waterMode:'', waterAmount:10, minimumMoisture: 50, timeInterval: '1 day'},
        {id:2 ,name: 'Plant 2', waterMode:true, waterAmount:10, minimumMoisture: 50, timeInterval: '1 day'},   // True: Auto, False: Manually
        {id:3 ,name: 'Plant 3', waterMode:'', waterAmount:10, minimumMoisture: 50, timeInterval: '1 day'},
    ];
    const [currentPlant, setCurrentPlant] = useState('');
    const choosePlant = (plantID) => {
        console.log(plantID);
        setCurrentPlant(plantID);
    }

        return(
        <div>
            <Navbar/>
            <div className={classes.row}>
                <div className={classes.columnList}>
                   {Plants.map(plant=>
                   <Plant key={plant.id} plant={plant} choosePlant={choosePlant}/>
                   )}
                </div>
                <div className={classes.columnSetting}>
                    
                </div>
            </div>
        </div>
        )

}
export default PlantList 