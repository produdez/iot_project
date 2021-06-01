import mqtt from "mqtt";

function getJSON(yourUrl) {

    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText; 

}

export default function setupAdaMqttClient(){
    var ada_info = JSON.parse(getJSON('https://cors-anywhere.herokuapp.com/'+'http://dadn.esp32thanhdanh.link/'))
    let [key1, key2] = ada_info.key.split(':')
    console.log('Acc1: ',process.env.REACT_APP_ADA_CSE_ID1,'---',key1)
    console.log('Acc2: ',process.env.REACT_APP_ADA_CSE_ID2,'---',key2)

    const options1 = {
        username: process.env.REACT_APP_ADA_CSE_ID1,
        password: key1,
    };
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
    })

    //! connect server 2
    const options2 = {
        username: process.env.REACT_APP_ADA_CSE_ID2,
        password: key2,
    };
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
    })

    //! set global client
    window.mqttClient1 = mqttClient1;
    window.mqttClient2 = mqttClient2;
}