import React from "react"
// import firebase from "firebase/app"
import {Line} from "react-chartjs-2"
import mqtt from "mqtt";

    class EnvCond extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                values: [1,3]
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
                const options = {
                  username: process.env.REACT_APP_ZYMETH_ADA_ID,
                  password: process.env.REACT_APP_ZYMETH_ADA_KEY
                };
                const url = 'tcp://io.adafruit.com:443';
                this.mqttClient = mqtt.connect(url, options);
                this.mqttClient.on('connect', (connack)=>{
                  console.log('Info:', connack)
                  this.mqttClient.subscribe('bkiot/feeds/captured_temp', (err, granted) => {if (err) console.log(err)})
                  console.log('connect to adafruit successfully')
                })
                this.mqttClient.on('message', (topic,message)=>{
                    console.log(parseFloat(message.toString()))
                    const date = new Date();
                    const options = {
                        weekday: 'short',
                        dateStyle: 'short',
                        era: 'short',
                        second: 'null'
                      }
                    this.setState({
                        values: this.state.values.concat(parseFloat(message.toString())),
                        date_time: this.state.date_time.concat(date.toLocaleString(options))
                    })
                    console.log(this.state.values)
                    console.log(this.state.date_time)
                    })
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
                        labels: this.state.date_time,
                        datasets: [
                            {
                                label: 'Environment Condition Chart',
                                data: this.state.values,
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
    // }
    // return <div>Loading </div>
    }
}

export default EnvCond