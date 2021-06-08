import React, {Component} from 'react';
import firebase from "firebase/app"

import classes from './PlantSetting.module.css'
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import MinMaxInputSlider from '../Sliders/MinMaxInputSlider';
import { withStyles } from '@material-ui/core/styles';

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
    water_mode: true,
    waterOn: false,
}
const DB_NAME = 'PlantSettings';
const styles = {
    inputBox: {
        width:70,
        backgroundColor:'#ffffff',
    },
    slider: {
        width:'50%', 
        color:'#5eed97',
    }, 
}

const GreenSwitch = withStyles({
    switchBase: {
      color: '#ffffff',
      '&$checked': {
        color: '#5eed97',
      },
      '&$checked + $track': {
        backgroundColor: '#5eed97',
      },
    },
    checked: {},
    track: {},
  })(Switch);

export default class PlantSetting extends Component {
    constructor(props){
        super(props)
        // let plant_id = this.props.plant.id;
        // this.classes = useStyles();     
        this.state = DEFAULT_SETTINGS;
        this.state = {
            ...this.state, 
            plant_id: this.props.plant.id, 
            water_mode: this.props.plant.waterMode,
            setAdaListener: false,
            setFirebaseListener: false,
            }
        this.ref = firebase.database().ref(DB_NAME).child(this.state.plant_id);
        // this.ref = firebase.database().ref(DB_NAME).orderByChild("plant_id").equalTo(this.state.plant_id);
        
        //check firebase settings data
        this.ref.once("value",snapshot => {
            console.log('once this: ',this)
            if (snapshot.exists()){
              let settings_data = snapshot.val();
              console.log("Loading Settings From FB-once", settings_data);
                // this.setState(settings_data);
                this.state = settings_data;
                console.log('State: ',this.state)
            }else{
                console.log('PlantSettings Not Up on server! Pushing defaultSettings to server!')
                // this.state = DEFAULT_SETTINGS;
                // // this.state.inputWaterMode = this.props.plant.waterMode;??
                // this.state.plant_id = this.props.plant.id;
                this.saveHandler(); // push empty settings on server
            }
        },{context : this});

        // this.ref.on("value",snapshot => {
        //     var settings_data = snapshot.val();
        //     console.log("Loading Settings From FB-on", settings_data);
        //     this.setState(settings_data)
        // },{context : this})

    }

    // waterAmountHandler = (event) =>{
    //     this.setState({water_amount: event.target.value});
    // }
    // minimumMoistureHandler = (event) => {
    //     this.setState({min_moist: event.target.value});
    // }
    // maximumMoistureHandler = (event) => {
    //     this.setState({max_moist: event.target.value});
    // }
    // minimumTemperatureHandler = (event) => {
    //     this.setState({min_temp: event.target.value});
    // }
    // maximumTemperatureHandler = (event) => {
    //     this.setState({max_temp: event.target.value});
    // }
    // minimumHumidityHandler = (event) => {
    //     this.setState({min_humi: event.target.value});
    // }
    // maximumHumidityHandler = (event) => {
    //     this.setState({max_humi: event.target.value});
    // }
    // minimumLightingHandler = (event) => {
    //     this.setState({min_light: event.target.value});
    // }
    // maximumLightingHandler = (event) => {
    //     this.setState({max_light: event.target.value});
    // }
    waterModeHandler = (event) => {
        this.setState((state)=>({...state, water_mode:!state.water_mode}))
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

        if (this.state.water_mode) // is in auto state
            return;

        let publishValue = this.state.waterOn?0:1; // if water is on: turn off, else turn on
        window.mqttClient2.publish('CSE_BBC1/feeds/bk-iot-relay', JSON.stringify(publishValue));
        this.setState((state) => ({...state, waterOn: !state.waterOn}))
    }

    handleWaterSliderChange = (event, newValue) => {
        this.setState((state) => ({...state, water_amount:newValue}));
    }
    handleWaterAmountInputChange = (event) => {
        let newVal = event.target.value===''?0:Number(event.target.value);
        if (newVal <= 100)
            this.setState((state)=>({...state, water_amount:event.target.value===''?'':Number(event.target.value)}))
        // this.handleWaterSliderChange(null,this.state.water_amount)
    }
    handleWaterAmountBlur = () => {
        if (this.state.water_amount < 0) {
            this.setState((state)=>({...state, water_amount:0}))
        }
        if (this.state.water_amount > 100) {
            this.setState((state)=>({...state, water_amount:100}))
        }
    }

    handleMoistSliderChange = (event, newValue) => {
        this.setState((state) => ({...state, min_moist:newValue[0], max_moist:newValue[1]}));
    }
    handleMinMoistInputChange = (event) => {
        
        this.setState((state)=>({...state, min_moist:event.target.value===''?'':Number(event.target.value)}))
    }
    handleMaxMoistInputChange = (event) => {
        this.setState((state)=>({...state, max_moist:event.target.value===''?'':Number(event.target.value)}))
    }
    handleMoistBlur = () => {

    }


    handleTempSliderChange = (event, newValue) => {
        this.setState((state) => ({...state, min_temp:newValue[0], max_temp:newValue[1]}));
    }
    handleMinTempInputChange = (event) => {
        this.setState((state)=>({...state, min_temp:event.target.value===''?'':Number(event.target.value)}))
    }
    handleMaxTempInputChange = (event) => {
        this.setState((state)=>({...state, max_temp:event.target.value===''?'':Number(event.target.value)}))
    }
    handleTempBlur = () => {

    }

    handleHumiSliderChange = (event, newValue) => {
        this.setState((state) => ({...state, min_humi:newValue[0], max_humi:newValue[1]}));
    }
    handleMinHumiInputChange = (event) => {
        this.setState((state)=>({...state, min_humi:event.target.value===''?'':Number(event.target.value)}))
    }
    handleMaxHumiInputChange = (event) => {
        this.setState((state)=>({...state, max_humi:event.target.value===''?'':Number(event.target.value)}))
    }
    handleHumiBlur = () => {

    }

    handleLightSliderChange = (event, newValue) => {
        this.setState((state) => ({...state, min_light:newValue[0], max_light:newValue[1]}));
    }
    handleMinLightInputChange = (event) => {
        this.setState((state)=>({...state, min_light:event.target.value===''?'':Number(event.target.value)}))
    }
    handleMaxLightInputChange = (event) => {
        this.setState((state)=>({...state, max_light:event.target.value===''?'':Number(event.target.value)}))
    }
    handleLightBlur = () => {

    }


    componentDidMount() {
        // //onfunction
        if (!this.state.setFirebaseListener)
        {
            this.setState((state)=>({...state, setFirebaseListener:true}));
            this.ref.on("value",snapshot => {
                var settings_data = snapshot.val();
                console.log("Loading Settings From FB-on", settings_data);
                this.setState(settings_data)
            },{context : this})
        }

        // // subscribe to ada relay
        if (!this.state.setAdaListener)
        {
            this.setState((state)=>({...state, setAdaListener:true}));
            window.mqttClient2.on('message', (topic, msg) => {
                if (topic === 'CSE_BBC1/feeds/bk-iot-relay'){
                    console.log('Received Relay Data from Ada')
                    console.log('from server:', msg.toString())
                    this.setState((state) => ({...state, waterOn: msg.toString() === '1'}))
                }
            })
        }
    }
    render(){
        return(<div>
                {/* <h2 className={classes.modal__header} >{this.props.plant.name}</h2> */}
                <div className={classes.modal__form}>
                
                <label>Water mode</label>
                <div style={{display: 'flex', justifyContent: 'left'}}>
                    <div>
                        <label style={{position: 'relative', top:'6px'}}> Manual </label>
                        <GreenSwitch checked={this.state.water_mode} onChange={this.waterModeHandler} name='waterMode'/>
                        <label style={{position: 'relative', top:'6px'}}> Auto </label>
                    </div>
                    <button style={{position:'relative', top:'-10px', marginLeft:'50px', border: 'none', borderRadius:'20px', fontWeight:'500', padding: '0.25rem 1rem',
                                    backgroundColor: this.state.water_mode?'rgba(165, 161, 161, 0.747)':'#b3ffd1'}} 
                            onClick={this.manualPumpHandler}
                            >
                        Pump: {this.state.waterOn?"ON":"OFF"}
                    </button>
                </div>             

                <label>Water amount </label>
                <div style={{display:'flex', justifyContent:'left'}}>
                    <div style={{display:'flex',flexDirection:'row', flexGrow:1}}>
                        <label style={{width:'2.5rem'}}> 0ml </label>
                        <Slider 
                            style={styles.slider}
                            value={this.state.water_amount}
                            onChange={this.handleWaterSliderChange}
                            aria-labelledby="input-slider"
                        />
                        <label style={{paddingLeft:'15px'}}> 100ml </label>
                    </div>
                    <div style={{justifyContent:'left', flexGrow:1}}>
                        <Input
                            // className={this.classes.input}
                            style={styles.inputBox}
                            value={this.state.water_amount}
                            // margin="dense"
                            onChange={this.handleWaterAmountInputChange}
                            onBlur={this.handleWaterAmountBlur}

                            inputProps={{
                                // step: 10,
                                // min: 0,
                                // max: 100,
                                // type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </div>
                </div>

                {/* Moisture part */}
                <label> Moisture </label>
                <MinMaxInputSlider
                    values={[this.state.min_moist, this.state.max_moist]}
                    leftLabel='0%'
                    rightLabel='100%'
                    handleSlider={this.handleMoistSliderChange}
                    handleInput0={this.handleMinMoistInputChange}
                    handleInput1={this.handleMaxMoistInputChange}
                    handleBlur={this.handleMoistBlur}
                />    

                {/* Temperature part */}
                <label> Temperature </label>
                <MinMaxInputSlider
                    values={[this.state.min_temp, this.state.max_temp]}
                    leftLabel={'0\u2103'}
                    rightLabel={'100\u2103'}
                    handleSlider={this.handleTempSliderChange}
                    handleInput0={this.handleMinTempInputChange}
                    handleInput1={this.handleMaxTempInputChange}
                    handleBlur={this.handleTempBlur}
                />    

                {/* Humidity part */}
                <label> Humidity </label>
                <MinMaxInputSlider
                    values={[this.state.min_humi, this.state.max_humi]}
                    leftLabel='0%'
                    rightLabel='100%'
                    handleSlider={this.handleHumiSliderChange}
                    handleInput0={this.handleMinHumiInputChange}
                    handleInput1={this.handleMaxHumiInputChange}
                    handleBlur={this.handleHumiBlur}
                />    

                <label> Lighting </label>
                <MinMaxInputSlider
                    values={[this.state.min_light, this.state.max_light]}
                    leftLabel='0%'
                    rightLabel='100%'
                    handleSlider={this.handleLightSliderChange}
                    handleInput0={this.handleMinLightInputChange}
                    handleInput1={this.handleMaxLightInputChange}
                    handleBlur={this.handleLightBlur}
                />    
                
                {/* <div>Current Settings</div>
                <div> {JSON.stringify(this.state,null,'\n')}</div> */}
                <button className={classes.btn} onClick={this.saveHandler}>Save</button>
                
                </div>
            </div>
        );
    }
}