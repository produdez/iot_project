import React, { useEffect } from "react";
import mqtt from "mqtt";
import firebase from "firebase/app"
import {DUMMY_NOTIFICATION} from '../Component/Notification'

function NotificationService(){
    console.log(DUMMY_NOTIFICATION)
    const ref = firebase.database().ref('Notification');

    console.log('Setting up notification Services')
    useEffect(() => {
        const options = {
          username: process.env.REACT_APP_ZYMETH_ADA_ID,
          password: process.env.REACT_APP_ZYMETH_ADA_KEY
        };
        const url = 'tcp://io.adafruit.com:443';
    
        const mqttClient = mqtt.connect(url, options);
        mqttClient.on('connect', (connack)=>{
        mqttClient.subscribe('bkiot/feeds/notification', (err, granted) => {if (err) console.log(err)})
          console.log('Connect to notification feed successfully')
        })
        mqttClient.on('message', (topic,message)=>{
                let notification_value = parseInt(message.toString())
                publish_notification_to_firebase(notification_value,ref)
            })
      })
}

function publish_notification_to_firebase(notification_value, ref){
    let noti_index = notification_value%10 + 1; // just a translation
    var newRef = ref.push();
    console.log('Pusing Notification To Firebase: ')
    console.log('Index: ', noti_index, 'Value: ', DUMMY_NOTIFICATION[noti_index])
    newRef.set(DUMMY_NOTIFICATION[noti_index]);

}
export default NotificationService