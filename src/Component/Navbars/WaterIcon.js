import React, { useRef, useState, useEffect } from "react"
import firebase from "firebase/app"

import watering_icon from '../Pics/watering.jpg';
import not_watering_icon from '../Pics/not_watering.jpg';
import styles from './WaterIcon.module.css'

const relay_ref = firebase.database().ref('Relay').orderByChild('plant_id').limitToLast(1);

export default  function WaterIcon(){
    const [watering, setWatering] = useState(false)
    
    const  manualPumpHandler = () => {
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
        return <img onClick = {manualPumpHandler} className = {styles.watering_logo} src={watering_icon} alt="WLogo" />
    return  <img onClick = {manualPumpHandler} className = {styles.not_watering_logo} src={not_watering_icon} alt="NWLogo" />
}