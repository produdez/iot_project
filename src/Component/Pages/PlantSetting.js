import React, {Component} from 'react';
import firebase from "firebase/app"

import classes from './PlantSetting.module.css'
import { TimeSeriesScale } from 'chart.js';

const EMPTY = ''
const DEFAULT_SETTINGS = {
    water_amount: EMPTY,
    min_moist:EMPTY,
    max_moist:EMPTY,
    min_temp:EMPTY,
    max_temp:EMPTY,
    min_humi:EMPTY,
    max_humi:EMPTY,
    min_light:EMPTY,
    max_light:EMPTY,
    water_mode : true,
    waterOn: false,
}
const DB_NAME = 'PlantSettings';


export default class PlantSetting extends Component {
    constructor(props){
        super(props)

        // let plant_id = this.props.plant.id;
        this.state = DEFAULT_SETTINGS;
        this.state.plant_id = this.props.plant.id;
        this.ref = firebase.database().ref(DB_NAME).child(this.state.plant_id);
        // this.ref = firebase.database().ref(DB_NAME).orderByChild("plant_id").equalTo(this.state.plant_id);
        this.state.water_mode = this.props.plant.waterMode;
        
        //check firebase settings data
        this.ref.once("value",snapshot => {
            console.log('once this: ',this)
            if (snapshot.exists()){
              let settings_data = snapshot.val();
              console.log("Loading Settings From FB-once", settings_data);
                this.setState(settings_data);
                console.log('State: ',this.state)
            }else{
                console.log('PlantSettings Not Up on server! Pushing defaultSettings to server!')
                // this.state = DEFAULT_SETTINGS;
                // // this.state.inputWaterMode = this.props.plant.waterMode;??
                // this.state.plant_id = this.props.plant.id;
                this.saveHandler(); // push empty settings on server
            }
        },{context : this});

    }
    waterAmountHandler = (event) =>{
        this.setState({water_amount: event.target.value});
    }
    minimumMoistureHandler = (event) => {
        this.setState({min_moist: event.target.value});
    }
    maximumMoistureHandler = (event) => {
        this.setState({max_moist: event.target.value});
    }
    minimumTemperatureHandler = (event) => {
        this.setState({min_temp: event.target.value});
    }
    maximumTemperatureHandler = (event) => {
        this.setState({max_temp: event.target.value});
    }
    minimumHumidityHandler = (event) => {
        this.setState({min_humi: event.target.value});
    }
    maximumHumidityHandler = (event) => {
        this.setState({max_humi: event.target.value});
    }
    minimumLightingHandler = (event) => {
        this.setState({min_light: event.target.value});
    }
    maximumLightingHandler = (event) => {
        this.setState({max_light: event.target.value});
    }
    waterModeHandler = (event) => {
        this.setState({inputWaterMode: event.target.value});
    }

    generate_settings_json(){
        var settings_json = {
            plant_id: this.state.plant_id,
            water_amount : this.state.water_amount,
            min_moist : this.state.min_moist,
            max_moist : this.state.max_moist,
            min_temp : this.state.min_temp,
            max_temp : this.state.max_temp,
            min_humi : this.state.min_humi,
            max_humi : this.state.max_humi,
            min_light : this.state.min_light,
            max_light : this.state.max_light,
            water_mode : this.state.water_mode,
        }
        return settings_json
    }
    saveHandler = () =>{

        //! push settings to firebase!
        console.log('Pushing new settings to fb!')
        var json_data = this.generate_settings_json();
        //find the correct reference and change it!
        let ref = firebase.database().ref(DB_NAME + '/' + this.state.plant_id.toString());
        ref.set(json_data)
    }

    manualPumpHandler = () => {
      console.log('manual pump clicked')

      let publishValue = this.state.waterOn?0:1; // if water is on: turn off, else turn on
      window.mqttClient2.publish('CSE_BBC1/feeds/bk-iot-relay', JSON.stringify(publishValue));
      this.setState((state) => ({...state, waterOn: !state.waterOn}))
    }

    componentDidMount() {
        //onfunction
        this.ref.on("value",snapshot => {
            var settings_data = snapshot.val();
            console.log("Loading Settings From FB-on", settings_data);
            this.setState(settings_data)
        },{context : this})

        // subscribe to ada relay
        window.mqttClient2.on('message', (topic, msg) => {
            if (topic === 'CSE_BBC1/feeds/bk-iot-relay'){
                console.log('Received Relay Data from Ada')
                console.log('from server:', msg.toString())
                this.setState((state) => ({...state, waterOn: msg.toString() === '1'}))
            }
        })
        
    }
    render(){
        return(<div>
                <h2 className={classes.modal__header} >{this.props.plant.name}</h2>
                <div className={classes.modal__form}>
                <label>Water amount (ml)</label>
                <input type="number" name="water_amount" 
                value = {this.state.water_amount} onChange={this.waterAmountHandler}/>

                {/* Moisture part */}
                <label>Minimum moisture (%)</label>
                <input type="number" name="MinimumMoisture" 
                value = {this.state.min_moist} onChange={this.minimumMoistureHandler}/>
                <label>Maximum moisture (%)</label>
                <input type="number" name="MaximumMoisture"
                value = {this.state.max_moist} onChange={this.maximumMoistureHandler}/>
                {/* Temperature part */}
                <label>Minimum Temperature (*C)</label>
                <input type="number" name="MinimumTemperature" 
                value = {this.state.min_temp} onChange={this.minimumTemperatureHandler}/>
                <label>Maximum Temperature (*C)</label>
                <input type="number" name="MaximumTemperature"
                value = {this.state.max_temp} onChange={this.maximumTemperatureHandler}/>
                {/* Humidity part */}
                <label>Minimum Humidity (%)</label>
                <input type="number" name="MinimumHumidity"
                value = {this.state.min_humi}  onChange={this.minimumHumidityHandler}/>
                <label>Maximum Humidity (%)</label>
                <input type="number" name="MaximumHumidity"
                value = {this.state.max_humi}  onChange={this.maximumHumidityHandler}/>
                {/* Lighting part */}
                <label>Minimum Lighting (%)</label>
                <input type="number" name="MinimumLighting"
                value = {this.state.min_light}  onChange={this.minimumLightingHandler}/>
                <label>Maximum Lighting (%)</label>
                <input type="number" name="MaximumLighting"
                value = {this.state.max_light}  onChange={this.maximumLightingHandler}/>

                <label>Water mode</label>
                <select name="modes" onChange={this.waterModeHandler}>
                    <option value={true}>Auto</option>
                    <option value={false}>Manual</option>
                </select>
                <div>Current Settings</div>
                <div> {JSON.stringify(this.state,null,'\n')}</div>
                <button className={classes.btn} onClick={this.saveHandler}>Save</button>
                <button className={classes.btn} onClick={this.manualPumpHandler}>Pump: {this.state.waterOn?"ON":"OFF"}</button>
                </div>
            </div>
        );
    }
}