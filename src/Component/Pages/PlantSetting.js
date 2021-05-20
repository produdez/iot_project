import React, {Component} from 'react';

import classes from './PlantSetting.module.css'


export default class PlantSetting extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputWaterMode:this.props.plant.waterMode,
            inputWaterAmount:'',
            inputMinimumMoisture:'',
            inputTimeInterval:'',
        };
    }
    waterAmountHandler = (event) =>{
        this.setState({inputWaterAmount: event.target.value});
    }
    minimumMoistureHandler = (event) => {
        this.setState({inputMinimumMoisture: event.target.value});
    }
    waterModeHandler = (event) => {
        this.setState({inputWaterMode: event.target.value});
    }
    saveHandler = () =>{
        this.props.plant.waterAmount = this.state.inputWaterAmount;
        this.props.plant.minimumMoisture = this.state.inputMinimumMoisture;
        this.props.plant.waterMode = this.state.inputWaterMode;
        console.log(this.props.plant);
        this.setState(this.props.plant);
    }
    render(){
        return(<div>
                <h2 className={classes.modal__header} >{this.props.plant.name}</h2>
                <div className={classes.modal__form}>
                <label>Water amount (ml)</label>
                <input type="number" name="WaterAmount" onChange={this.waterAmountHandler}/>
                <label>Minimum moisture (%)</label>
                <input type="number" name="MinimumMoisture" onChange={this.minimumMoistureHandler}/>
                <label>Water mode</label>
                <select name="modes" onChange={this.waterModeHandler}>
                    <option value={true}>Auto</option>
                    <option value={false}>Manual</option>
                </select>
                <div>Current Water amount, Minimum moisture, Water mode respectively:</div>
                <div>{this.props.plant.waterAmount},{this.props.plant.minimumMoisture},{this.props.plant.waterMode ? "Auto" : "Manual"} 
                </div>
                <button className={classes.btn} onClick={this.saveHandler}>Save</button>
                </div>
            </div>
        );
    }
}