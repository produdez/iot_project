import React from "react"
import style from './Header.module.css';
import {Card} from "react-bootstrap"

    class EnvCond extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                temp_value: null,
                humid_value: null,
                light_value: null,
                moisture_value: null
            }
        }

        saveStateToLocalStorage() {
            // for every item in React state
            for (let key in this.state) {
                // save to localStorage
                localStorage.setItem(key, JSON.stringify(this.state[key]));
            }
        }
        hydrateStateWithLocalStorage() {
            // for all items in state
            for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
                let value = localStorage.getItem(key);

            // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                    } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                    }
                }
            }
        }
        componentDidMount(){
            this.hydrateStateWithLocalStorage();
            //
            window.addEventListener(
                "beforeunload",
                this.saveStateToLocalStorage.bind(this)
            );
            //Start Captureing
            var mqttClient =  window.mqttClient1
            mqttClient.on('message', (topic,message)=>{
                if (topic === 'CSE_BBC/feeds/bk-iot-soil'){
                    console.log('-----------------------------------------------------')
                    console.log('Received moisture data from ada:')
                    console.log(message.toString())
                    var moisture_data = JSON.parse(message.toString())
                    this.setState({
                        moisture_value: parseFloat(moisture_data.data)
                    })
                }
                if(topic === 'CSE_BBC/feeds/bk-iot-temp-humid'){
                    console.log('-----------------------------------------------------')
                    console.log('Received temp-humid data from ada:')
                    console.log(message.toString())
                    //todo: split temp-humid and check notification seperately
                    var sensor_json_data = JSON.parse(message.toString())
                    //split json 
                    let [temp, humi] = sensor_json_data.data.split('-')
                    this.setState({
                    temp_value: parseFloat(temp),
                    humid_value: parseFloat(humi)
                    })
                }
            });

            var mqttClient2 = global.mqttClient2;
            mqttClient2.on('message', (topic,message)=>{
            if(topic === 'CSE_BBC1/feeds/bk-iot-light'){
                console.log('-----------------------------------------------------')
                console.log('Received light data from ada:')
                console.log(message.toString())
                var light_data = JSON.parse(message.toString())
                this.setState({
                    light_value: parseFloat(light_data.data),
                })
            }
            })
        }

        componentWillUnmount(){
            window.removeEventListener(
                "beforeunload",
                this.saveStateToLocalStorage.bind(this)
            );
              // saves if component has a chance to unmount
            this.saveStateToLocalStorage();
            if (this.client)
                this.client.end()
        }
        render() {
            return(
                <div className={style.row}>
                    <Card className="text-center" >
                        <center>Temperature</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div >
                            <p className={style.description}>{this.state.temp_value?this.state.temp_value+' Celsius':'Loading...'}</p>
                        </div>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <center>Air Humidity</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div className={style.column}>
                            <p className={style.description}>{this.state.humid_value?this.state.humid_value+' %':'Loading...'}</p>
                        </div>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <center>Brightness</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div className={style.column}>
                            <p className={style.description}>{this.state.light_value?this.state.light_value:'Loading...'}</p>
                        </div>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <center>Soil's Moisture</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div className={style.column}>
                            <p className={style.description}>{this.state.humid_value?this.state.moisture_value+' %':'Loading...'}</p>
                        </div>
                        </Card.Body>
                    </Card>
                </div>
                )
            }
    }

export default EnvCond