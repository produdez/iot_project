import React from "react"
// import firebase from "firebase/app"
import {Line} from "react-chartjs-2"
import mqtt from "mqtt";

    class EnvCond extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                temp_values: [],
                temp_date_time: [],
                humid_values: [],
                humid_date_time: []
            }
            }


        componentDidMount(){
            // var ref = firebase.database().ref('EnvironmentData');
            // ref.on('value', (snapshot)=>{
            //     this.setState({...this.state, data: snapshot.val()})
            //     this.setState({
            //         keys: this.state.data?Object.keys(this.state.data):this.state.keys
            //      })
            // });
            // var AIO = require('adafruit-io');
            // // replace xxxxxxxxxxxx with your AIO Key
            // AIO('bkiot', '').feeds(function(err, feeds) {

            //         if(err) {
            //           return console.error(err);
            //         }

            //         // log feeds array
            //         console.log(feeds);

            //       });
                // const options = {
                //   username: process.env.REACT_APP_ZYMETH_ADA_ID,
                //   password: process.env.REACT_APP_ZYMETH_ADA_KEY
                // };
                // const url = 'tcp://io.adafruit.com:443';
                // this.mqttClient = mqtt.connect(url, options);
                // this.mqttClient2 = mqtt.connect(url,options);
                // this.mqttClient.on('connect', (connack)=>{
                //   this.mqttClient.subscribe('bkiot/feeds/captured_temp', (err, granted) => {if (err) console.log(err)})
                //   console.log('connect to temp successfully')
                // });
                window.mqttClient1.on('message', (topic,message)=>{
                    if (topic === 'CSE_BBC/feeds/bk-iot-soil'){
                        //! process moisture
                        console.log('Received soil data')
                        console.log(JSON.parse(message))
                    }
                    if (topic === 'CSE_BBC/feeds/bk-iot-temp-humid'){
                        //! process temp humid stuffs
                        console.log('Received temp-humid data')
                        console.log(JSON.parse(message))
                        // const date = new Date();
                        // const options = {
                        //     weekday: 'short',
                        //     dateStyle: 'short',
                        //     era: 'short',
                        //     second: 'null'
                        // }
                        // this.setState({
                        //     temp_values: this.state.temp_values.concat(parseFloat(message.toString())),
                        //     temp_date_time: this.state.temp_date_time.concat(date.toLocaleString(options))
                        // })
                    }
                }, {context:this});
                window.mqttClient2.on('message', (topic,message)=>{
                    if (topic === 'CSE_BBC1/feeds/bk-iot-light'){
                        //! process light
                        console.log('Received light data')
                        console.log(JSON.parse(message))
                        // const date = new Date();
                        // const options = {
                        //     weekday: 'short',
                        //     dateStyle: 'short',
                        //     era: 'short',
                        //     second: 'null'
                        //   }
                        // this.setState({
                        //     humid_values: this.state.humid_values.concat(parseFloat(message.toString())),
                        //     humid_date_time: this.state.humid_date_time.concat(date.toLocaleString(options))
                        // })
                    }
                    
                },{context : this});
        }

        componentWillUnmount(){
            if (this.client)
                this.client.end()
        }
        render() {
            // if (this.state.keys) {
            // console.log(this.state.keys)
            // var value = []
            // for (var i = 0; i < this.state.keys.length; i++) {
            //     var k = this.state.keys[i];
            //     var plantId = this.state.data[k].plantId;
            //     value = value.concat(this.state.data[k].value);
            //     console.log(plantId,value)
            // }



            return(
            <div>
                <Line
                    data= {{
                        labels: this.state.temp_date_time,
                        datasets: [
                            {
                                label: 'Environment Temperature Chart',
                                data: this.state.temp_values,
                            }
                        ],
                    }}
                    height = {1}
                    width = {5}
                    options= {{
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
                <Line
                    data= {{
                        labels: this.state.humid_date_time,
                        datasets: [
                            {
                                label: 'Environment Humidity Chart',
                                data: this.state.humid_values,
                            }
                        ],
                    }}
                    height = {1}
                    width = {5}
                    options= {{
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
            )
    }
    // return <div>Loading </div>
    // }
}

export default EnvCond
