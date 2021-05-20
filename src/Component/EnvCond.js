import React from "react"
import firebase from "firebase/app"
import {Line} from "react-chartjs-2"

    class EnvCond extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                values: [],
                date_time: []
            }
            }

        componentDidMount(){
            var ref = firebase.database().ref('EnvironmentData');
            ref.on('value', (snapshot)=>{
                this.setState({...this.state, data: snapshot.val()})
                this.setState({
                    keys: this.state.data?Object.keys(this.state.data):this.state.keys
                 })
            });
            
        }

        render() {
            if (this.state.keys) {
            console.log(this.state.keys)
            var value = []
            for (var i = 0; i < this.state.keys.length; i++) {
                var k = this.state.keys[i];
                var plantId = this.state.data[k].plantId;
                value = value.concat(this.state.data[k].value);
                console.log(plantId,value)
            }
            return(
            <div>
                <Line
                    data= {{
                        labels: this.state.keys,
                        datasets: [
                            {
                                label: 'Environment Condition Chart',
                                data: value,
                            }
                        ]
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
    return <div>Loading </div>
    }
}

export default EnvCond