import mqtt from "mqtt";
import firebase from "firebase/app"

// function getJSON(yourUrl) {

//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",yourUrl,false);
//     Httpreq.send(null);
//     return Httpreq.responseText; 

// }

async function get_ada_auth_info_from_firebase(){
    const ref = firebase.database().ref('AdaAuth')
    var auth_json = undefined
    await ref.once("value",snapshot => {
        auth_json = snapshot.val();
        console.log('AdaAuth from FB: ', JSON.stringify(auth_json))
    });
    return auth_json
}
export default async function setupAdaMqttClient(){
    console.log('Settingup ada !')
    // to control error logging
    var allowErr1 = true;
    var allowErr2 = true;

  
    var auth_json = await get_ada_auth_info_from_firebase()
    window.adaAuth = auth_json; //!global
    
    console.log('Acc1: ',auth_json.user1,'---',auth_json.pass1)
    console.log('Acc2: ',auth_json.user2,'---',auth_json.pass2)
    var options1 = {
        username: auth_json.user1,
        password: auth_json.pass1
    }
    var options2 = {
        username: auth_json.user2,
        password: auth_json.pass2
    }
    console.log('op1:',options1)
    console.log('op2',options2)
    // // //! connect server 1
    // //TODO: uncomment all below to connect to ada-temp-humid-soil
    // const url1 = 'tcp://io.adafruit.com:443';
    // // console.log(url)
    // const mqttClient1 = mqtt.connect(url1, options1);
    // mqttClient1.on('connect', (connack)=>{
    //     // console.log('Info:', connack)
    //     mqttClient1.subscribe(auth_json.feed_soil, (err, granted) => {
    //         if (err) console.log('soil feed subscription error: ',err);
    //         if (granted) console.log('Subed to soil feed')
    //     })
    //     mqttClient1.subscribe(auth_json.feed_temp_humi, (err, granted) => {
    //         if (err) console.log('Temp-Humid feed subscription error: ',err);
    //         if (granted) console.log('Subed to Temp-Humid feed')
    //     })
    //     console.log('connect to adafruit 1 successfully')
    //     allowErr1 = true
    // })
    // mqttClient1.on('error', (error)=>{
    //     if (allowErr1){
    //         console.log('Error connecting to adaFruit 1 ', error)
    //         allowErr1 = false;
    //     }
    // })

    //! connect server 2
    // console.log(options2)
    // const url2 = `mqtts://${options2.username}:${options2.password}@io.adafruit.com`;
    const url2 = 'tcp://io.adafruit.com:443';
    // console.log(url)
    const mqttClient2 = mqtt.connect(url2, options2);
    mqttClient2.on('connect', (connack)=>{
        //TODO: uncomment this if want ada-light
        // mqttClient2.subscribe(auth_json.feed_light, (err, granted) => {
        //     if (err) console.log('Light feed subscription error: ',err);
        //     if (granted) console.log('Subed to light feed')
        // })
        mqttClient2.subscribe(auth_json.feed_relay, (err, granted) => {
            if (err) console.log('Relay feed subscription error: ',err);
            if (granted) console.log('Subed to relay feed')
        })
        console.log('connect to adafruit 2 successfully')
        allowErr2 = true;
    })
    mqttClient2.on('error', (error)=>{
        if (allowErr2){
            console.log('Error connecting to adaFruit 2! ', error)
            allowErr2 = false
        }
    })

    //! set global client
    //todo: uncomment below if want global client1
    // window.mqttClient1 = mqttClient1;
    window.mqttClient2 = mqttClient2;

    //! set global status variables
    window.onRelayIsSetup = false;
}