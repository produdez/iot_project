import React, {Component} from 'react';
import firebase from "firebase/app"

import classes from './PlantSetting.module.css'
import HelpIcon from '@material-ui/icons/Help';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import MinMaxInputSlider from '../Sliders/MinMaxInputSlider';
import { withStyles } from '@material-ui/core/styles';

const EMPTY = 0;
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
    water_mode: false,
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
const ENVCOND_VAR_NAMES = {
  MOISTURE: {
    text: 'Moisture',
    minVar: 'min_moist',
    maxVar: 'max_moist',
    unit: '%',
    tooltip:'The good range of moisture for this plant',
  },
  TEMPERATURE: {
    text: 'Temperature',
    minVar: 'min_temp',
    maxVar: 'max_temp',
    unit: '\u2103',
    tooltip:'The good range of temperature for this plant',
  },
  HUMIDITY: {
    text: 'Humidity',
    minVar: 'min_humi',
    maxVar: 'max_humi',
    unit: '%',
    tooltip:'The good range of humidity for this plant',
  },
  LIGHTING: {
    text: 'Lighting',
    minVar: 'min_light',
    maxVar: 'max_light',
    unit: '%',
    tooltip:'The good range of lighting for this plant',
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

const NiceTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 13,
    maxWidth: 220,
  }
}))(Tooltip);

function PlantTooltip(props) {
  return (
    <NiceTooltip 
      placement='right'
      title={
        <span style={{whiteSpace:'pre-line'}}>{props.title}</span> 
      }
    >
      <HelpIcon style={{fontSize: 18}}/>
    </NiceTooltip>
  );
}

export default class PlantSetting extends Component {
    constructor(props){
        super(props)
        // let plant_id = this.props.plant.id;
        // this.classes = useStyles();     
        this.state = DEFAULT_SETTINGS;
        this.state = {
            ...this.state, 
            operational: this.props.plant.operational,
            plant_id: this.props.plant.id, 
            water_mode: this.props.plant.waterMode,
            setAdaListener: false,
            setFirebaseListener: false,
            }
        this.ref = firebase.database().ref(DB_NAME).child(this.state.plant_id);
        this.relay_ref = firebase.database().ref('Relay').orderByChild('plant_id')
        .equalTo(this.state.plant_id.toString()).limitToLast(1)

    }

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
        if (! this.state.operational){
            window.alert("Hardware has not been setup for this operation!");
            return
        }
        console.log('Manual pump clicked!')
        if (this.state.water_mode){
            // is in auto state
            console.log('In auto mode, cant pump manual? :D');
            return;
        } 

        let relay_value = this.state.waterOn?0:1; // if water is on: turn off, else turn on
        
        const publish_json = {
            id: '11',
            name: 'RELAY',
            data: relay_value.toString(),
            unit: ''
        }
        window.mqttClient2.publish(window.adaAuth.feed_relay, JSON.stringify(publish_json));
        this.setState((state) => ({...state, waterOn: !state.waterOn}))
    }

    handleWaterAmountSliderChange = (event, newValue) => {
      this.setState((state) => ({...state, water_amount:newValue}));
    }
    handleWaterAmountInputChange = (event) => {
      this.setState((state)=>({...state, water_amount:event.target.value===''?'':Number(event.target.value)}));
    }
    handleWaterAmountBlur = (bounds, defaultValue) => (event) => {
      let value = event.target.value;
      if (value < bounds[0] || isNaN(value)) {
        this.setState((state)=>({...state, water_amount:bounds[0]}));
      } 
      else if (value > bounds[1]) {
        this.setState((state)=>({...state, water_amount:bounds[1]}));
      }
    }

    // new handler
    handleSliderChange = (varNameMin, varNameMax) => (event, newValue) => {
      this.setState((state) => ({...state, [varNameMin]:newValue[0], [varNameMax]:newValue[1]}));
    }
    handleInputChange = (varName) => (event) => {
      this.setState((state)=>({...state, [varName]:event.target.value===''?'':Number(event.target.value)}));
    }
    handleBlur = (varNameMin, varNameMax, isMax, bounds, defaultValue) => (event) => {
      let value = event.target.value;
      if (isMax) {
        if (value < this.state[varNameMin]
          || value < bounds[0] || value > bounds[1]
          || isNaN(value))
          {
            this.setState((state)=>({...state, [varNameMax]:defaultValue}));
          }
        }
        else {
          if (value > this.state[varNameMax] 
              || value < bounds[0] || value > bounds[1]
              || isNaN(value))
          {
            this.setState((state)=>({...state, [varNameMin]:defaultValue}));
          }
      }
      
    }

    componentDidMount() {
        //onfunction
        this.ref.on("value",snapshot => {
            if (snapshot.exists()){
                let settings_data = snapshot.val();
                console.log("Loading Settings From firebase");
                this.setState(settings_data);
            }else{
                console.log('PlantSettings Not Up on server! Pushing defaultSettings to server!')
                this.saveHandler(); // push empty settings on server
            }
        },{context : this})

        
        this.relay_ref.on("value", snapshot => {
                let json = JSON.parse(JSON.stringify(snapshot.val()))
                if (json === null) return
                json = Object.values(json)[0]
                console.log('Received Relay Data from Fb')
                console.log(json)
                this.setState((state) => ({...state, waterOn: json.data === '1'}))
            }
        )

        // //subscribe to ada relay
        // if(!window.onRelayIsSetup){
        //     window.mqttClient2.on('message', (topic, msg) => {
        //         if (topic === window.adaAuth.feed_relay){
        //                 console.log('Received Relay Data from Ada')
        //                 console.log('from server:', msg.toString())
        //                 let relay_json = JSON.parse(msg.toString())
        //                 this.setState((state) => ({...state, waterOn: relay_json.data === '1'}))
        //             }
        //         }, {context : this})
        //     window.onRelayIsSetup = true;
        // }
    }

    componentWillUnmount(){
        this.ref.off()
        this.relay_ref.off()
    }
    render(){
        return(<div>
                <div className={classes.modal__form}>
                
                <label>Water mode 
                <PlantTooltip
                  title={'Set to manual mode for controlling the pump manually. \n\n'+
                          'Set to auto mode to automatically keep your plant under set conditions'}
                />
                </label>
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

                <label>Water amount 
                <PlantTooltip
                  title={'The amount of water pumped each time the moisture goes too low'}
                />
                </label>
                <div style={{display:'flex', justifyContent:'left'}}>
                    <div style={{display:'flex',flexDirection:'row', flexGrow:1}}>
                        <label style={{width:'2.5rem'}}> 0ml </label>
                        <Slider 
                            style={styles.slider}
                            value={this.state.water_amount}
                            onChange={this.handleWaterAmountSliderChange}
                            aria-labelledby="input-slider"
                        />
                        <label style={{paddingLeft:'15px'}}> 100ml </label>
                    </div>
                    <div style={{justifyContent:'left', flexGrow:1}}>
                        <Input
                            
                            disableUnderline={true}
                            style={styles.inputBox}
                            value={this.state.water_amount}
                            onChange={this.handleWaterAmountInputChange}
                            onBlur={this.handleWaterAmountBlur([0, 100], 0)}

                            inputProps={{
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </div>
                </div>

                {
                  // please do not hunt me down, thanks
                  Object.values(ENVCOND_VAR_NAMES).map((obj, idx) => {
                    const { text, minVar, maxVar, unit, tooltip } = obj;
                    return (
                      <>
                        <label key={`${text}-label`}> {text} 
                        <PlantTooltip
                          title={tooltip}
                        />
                        </label>
                        <MinMaxInputSlider
                          key={`${text}-slider-and-input`}
                          values={[this.state[minVar], this.state[maxVar]]}
                          leftLabel={`0${unit}`}
                          rightLabel={`100${unit}`}
                          handleSlider={this.handleSliderChange(minVar, maxVar)}
                          handleInput={[this.handleInputChange(minVar), this.handleInputChange(maxVar)]}
                          handleBlur={[this.handleBlur(minVar, maxVar, false, [0, 100], 0), this.handleBlur(minVar, maxVar, true, [0, 100], 100)]}
                        />    
                      </>
                    );
                  })
                }
  
                {/* <div>Current Settings</div>
                <div> {JSON.stringify(this.state,null,'\n')}</div> */}
                <button className={classes.btn} onClick={this.saveHandler}>Save</button>
                
                </div>
            </div>
        );
    }
}