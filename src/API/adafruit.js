import mqtt from "mqtt";
import firebase from "firebase/app"

function getJSON(yourUrl) {

    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText; 

}

async function get_ada_auth_info_from_firebase(){
    const ref = firebase.database().ref('AdaAuth')
    var auth_json = undefined
    await ref.once("value",snapshot => {
        auth_json = snapshot.val();
        console.log('AdaAuth from FB: ', auth_json)
    });
    return auth_json
}
export default async function setupAdaMqttClient(){
    var options1 = undefined;
    var options2 = undefined;
    try{
        var ada_info = JSON.parse(getJSON('https://cors-anywhere.herokuapp.com/'+'http://dadn.esp32thanhdanh.link/'))
        let [key1, key2] = ada_info.key.split(':')
        console.log('Acc1: ',process.env.REACT_APP_ADA_CSE_ID1,'---',key1)
        console.log('Acc2: ',process.env.REACT_APP_ADA_CSE_ID2,'---',key2)

        options1 = {
            username: process.env.REACT_APP_ADA_CSE_ID1,
            password: key1,
        };
        options2 = {
            username: process.env.REACT_APP_ADA_CSE_ID2,
            password: key2,
        };
    }catch(e){
        console.log('Fail to load authentication data from link, switching to firebase!')
        var auth_json = await get_ada_auth_info_from_firebase()
        console.log('Acc1: ',auth_json.id1,'---',auth_json.key1)
        console.log('Acc2: ',auth_json.id2,'---',auth_json.key2)
        options1 = {
            username: auth_json.id1,
            password: auth_json.key1
        }
        options2 = {
            username: auth_json.id2,
            password: auth_json.key2
        }
        console.log('op1:',options1)
        console.log('op2',options2)
    }finally{
        // console.log(options1)
        // const url1 = `mqtts://${options1.username}:${options1.password}@io.adafruit.com`;
        const url1 = 'tcp://io.adafruit.com:443';
        // console.log(url)
        const mqttClient1 = mqtt.connect(url1, options1);
        mqttClient1.on('connect', (connack)=>{
            // console.log('Info:', connack)
            mqttClient1.subscribe('CSE_BBC/feeds/bk-iot-soil', (err, granted) => {
                if (err) console.log('soil feed subscription error: ',err);
                if (granted) console.log('Subed to soil feed')
            })
            mqttClient1.subscribe('CSE_BBC/feeds/bk-iot-temp-humid', (err, granted) => {
                if (err) console.log('Temp-Humid feed subscription error: ',err);
                if (granted) console.log('Subed to Temp-Humid feed')
            })
            console.log('connect to adafruit CSE_BBC successfully')
        })
        mqttClient1.on('error', (error)=>{
            console.log('Error connecting to adaFruit CSE_BBC! ', error)

            // IMPORTANT: delete when running on real device
            mqttClient1.end(true)
        })

        //! connect server 2
        // console.log(options2)
        // const url2 = `mqtts://${options2.username}:${options2.password}@io.adafruit.com`;
        const url2 = 'tcp://io.adafruit.com:443';
        // console.log(url)
        const mqttClient2 = mqtt.connect(url2, options2);
        mqttClient2.on('connect', (connack)=>{
            // console.log('Info:', connack)
            mqttClient2.subscribe('CSE_BBC1/feeds/bk-iot-light', (err, granted) => {
                if (err) console.log('Light feed subscription error: ',err);
                if (granted) console.log('Subed to light feed')
            })
            mqttClient2.subscribe('CSE_BBC1/feeds/bk-iot-relay', (err, granted) => {
                if (err) console.log('Relay feed subscription error: ',err);
                if (granted) console.log('Subed to relay feed')
            })
            console.log('connect to adafruit CSE_BBC1 successfully')
        })
        mqttClient2.on('error', (error)=>{
            console.log('Error connecting to adaFruit CSE_BBC1! ', error)

            // IMPORTANT: delete when running on real device
            mqttClient2.end(true)
        })

        //! set global client
        window.mqttClient1 = mqttClient1;
        window.mqttClient2 = mqttClient2;

        //! set global status variables
        window.setupOnLight = false;
        window.setupOnMoisture = false;
        window.setupOnHumidity = false;
        window.setupOnTemperature = false;
        window.setupOnRelay = false;
    }
}