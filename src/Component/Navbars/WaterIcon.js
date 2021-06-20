import React, { useRef, useState, useEffect } from "react"
import firebase from "firebase/app"

import watering_icon from '../Pics/watering.jpg';
import not_watering_icon from '../Pics/not_watering.jpg';
import styles from './WaterIcon.module.css'

const relay_ref = firebase.database().ref('Relay').orderByChild('plant_id').limitToLast(1);
export default  function WaterIcon(props){
    const [watering, setWatering] = useState(false)
    const operational = props.plant.operational
    const settings_ref = firebase.database().ref('PlantSettings').child(props.plant.id);
    const [auto, setAuto] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        setup_firebase() 
    });
    const setup_firebase = async () => {
        await settings_ref.on('value', snapshot => {
            let settings_data = snapshot.val();
            // console.log('New auto? ', settings_data.water_mode)
            setAuto(settings_data.water_mode)
        })
        setLoading(false)
    }

    const  manualPumpHandler = () => {
        if (!operational){
            window.alert("Hardware has not been setup for this operation!");
            return
        }
        if (auto){
            window.alert("Turn off auto pump before controlling manually!");
            return
        }
        let relay_value = watering?0:1; // if water is on: turn off, else turn on
        console.log('Clicked Watering')
        const publish_json = {
            id: '11',
            name: 'RELAY',
            data: relay_value.toString(),
            unit: ''
        }
        window.mqttClient2.publish(window.adaAuth.feed_relay, JSON.stringify(publish_json));
        setWatering(!watering)
    }

    useEffect(()=>{
        relay_ref.on('child_added', function (snapshot) {
            let json = snapshot.val()
            setWatering(json.data === '1')
        })
    }, []) // <-- empty dependency array
    
    if (watering)
        return (
            <div>
            {loading ? null:
                <img onClick = {manualPumpHandler} className = {styles.watering_logo} src={watering_icon} alt="WLogo" /> 
            }
            </div>)
    // return  <img onClick = {manualPumpHandler} className = {styles.not_watering_logo} src={not_watering_icon} alt="NWLogo" />
    return (
        <div>
        {loading ? null:
            <img onClick = {manualPumpHandler} className = {styles.not_watering_logo} src={not_watering_icon} alt="NWLogo" /> 
        }
        </div>)
}