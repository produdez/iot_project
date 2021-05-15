import React, {Component,useState} from 'react';
import Navbar from '../Navbars/Navbar'
import classes from './PlantList.module.css'
import Plant from '../Plant.js';


const PlantList = props => {
    const Plants = [
        {id:1 ,name: 'Plant 1', waterMode:true, waterAmount:10, minimumMoisture: 50, timeInterval: '1 day'},
        {id:2 ,name: 'Plant 2', waterMode:true, waterAmount:5, minimumMoisture: 20, timeInterval: '1 day'},   // True: Auto, False: Manually
        {id:3 ,name: 'Plant 3', waterMode:false, waterAmount:7, minimumMoisture: 8, timeInterval: '1 day'},
    ];
    const isCorrect = (plant) => {
        return plant.id === currentPlant;
    }
    const [currentPlant, setCurrentPlant] = useState(1);
    const [waterAmount, setWaterAmount] = useState('');
    const [minimumMoisture, setMinimumMoisture] = useState('');
    const [waterMode, setWaterMode] = useState(Plants.find(isCorrect).waterMode);
    const choosePlant = (plantID) => {
        console.log(plantID);
        setCurrentPlant(plantID);
    }
  
    const waterAmountHandler = (event) =>{
        setWaterAmount(event.target.value);
    }
    const minimumMoistureHandler = (event)=>{
        setMinimumMoisture(event.target.value);
    }
    const waterModeHandler = (event) =>{
        setWaterMode(event.target.value);
    }
    const saveData = () => {
        Plants.find(isCorrect).waterAmount = waterAmount;
        Plants.find(isCorrect).minimumMoisture = minimumMoisture;
        Plants.find(isCorrect).waterMode =waterMode;
        console.log(Plants)
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
                        <h2 className={classes.modal__header} >{Plants.find(isCorrect).name}</h2>
                        <div className={classes.modal__form}>
                        <label>Water amount (ml)</label>
                        <input type="number" name="WaterAmount" onChange={waterAmountHandler}/>
                        <label>Minimum moisture (%)</label>
                        <input type="number" name="MinimumMoisture" onChange={minimumMoistureHandler}/>
                        <label>Water mode</label>
                        <select name="modes" onChange={waterModeHandler}>
                            <option value={true}>Auto</option>
                            <option value={false}>Manual</option>
                        </select>
                        <div>Prev Water amount, Minimum moisture, Water mode respectively:</div>
                        <div>{Plants.find(isCorrect).waterAmount},{Plants.find(isCorrect).minimumMoisture},{Plants.find(isCorrect).waterMode ? 'Auto' : 'Manual'}</div>
                        <button className={classes.btn} onClick={saveData}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        )

}
export default PlantList 