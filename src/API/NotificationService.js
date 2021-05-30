import React, { useEffect } from "react";
import mqtt from "mqtt";
import firebase from "firebase/app"
import {DUMMY_NOTIFICATION} from '../Component/Notification'

function NotificationService(){
    console.log(DUMMY_NOTIFICATION)
    const ref = firebase.database().ref('Notification');

    console.log('Setting up notification Services')
    useEffect(() => {
        window.mqttClient.on('message', (topic,message)=>{
          if (topic === 'bkiot/feeds/notification'){
            console.log('Receive notif-data from ada!')
            let notification_value = parseInt(message.toString())
            publish_notification_to_firebase(notification_value,ref)
          }
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