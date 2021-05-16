import React from "react"
import firebase from "firebase/app"
import {Line} from "react-chartjs-2"

    class EnvCond extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                data: null
            }
            }

        componentDidMount(){
            var ref = firebase.database().ref('EnvironmentData');
            ref.on('value', (snapshot)=>{
                this.setState({...this.state, data: snapshot.val()})
            });
        }

        render() {
            console.log(this.state.data)
            return(
            <div>
                <Line
                    data= {{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [
                            {
                                label: '# of Votes',
                                data: this.state.data?[this.state.data.ed1.value, this.state.data.ed2.value]:[],
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
}

export default EnvCond