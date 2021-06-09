import React, {useState} from 'react';
// import Navbar from '../Navbars/Navbar'
import classes from './PlantList.module.css'
import Plant from '../Plant.js';
import PlantSetting from './PlantSetting'

const Plants = [
    {id:1 ,name: 'Plant 1', waterMode:true, waterAmount:10, minimumMoisture: 50, timeInterval: '1 day'},
    {id:2 ,name: 'Plant 2', waterMode:true, waterAmount:5, minimumMoisture: 20, timeInterval: '1 day'},   // True: Auto, False: Manually
    {id:3 ,name: 'Plant 3', waterMode:false, waterAmount:7, minimumMoisture: 8, timeInterval: '1 day'},
];
const PlantList = props => {
   
    const isCorrect = (plant) => {
        return plant.id === currentPlant;
    }
    const [currentPlant, setCurrentPlant] = useState(1);
    const choosePlant = (plantID) => {
        setCurrentPlant(plantID);
        console.log('Switching Plant View!')
        console.log(plantID)
    }
        return(
        <div>
            <div className={classes.row}>
                {/* <div className={classes.columnList}>
                   {Plants.map(plant=>
                   <Plant key={plant.id} plant={plant} choosePlant={choosePlant}/>
                   )}
                </div> */}
                <div className={classes.columnSetting}>
                    <PlantSetting 
                        key = {currentPlant - 1} plant={Plants[currentPlant-1]} 
                    />
                </div>
            </div>
        </div>
        )

}
export default PlantList 