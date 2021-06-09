import React, { useRef, useState, useEffect } from "react"
import style from './Header.module.css';
import {Card} from "react-bootstrap"
import firebase from "firebase/app"

const LOG_ENV_COND = false;

    class EnvCond extends React.Component{
        constructor(props) {
            super(props);
            this.plant_id = this.props.plant.id
            // console.log('Plantid : ' , this.plant_id    )
            this.state = {
                temp_value: null,
                humid_value: null,
                light_value: null,
                moisture_value: null,
                last_update_temp : null,
                last_update_humid : null,
                last_update_light : null,
                last_update_moisture : null,
            }
            this.temp_ref =  firebase.database().ref('Temperature')
                .orderByChild("plant_id").equalTo(this.plant_id.toString())
                .limitToLast(1);
            this.moist_ref =  firebase.database().ref('Moisture')
                .orderByChild("plant_id").equalTo(this.plant_id.toString())
                .limitToLast(1);
            this.humi_ref =  firebase.database().ref('Humidity')
                .orderByChild("plant_id").equalTo(this.plant_id.toString())
                .limitToLast(1);
            this.light_ref =  firebase.database().ref('Light')
                .orderByChild("plant_id").equalTo(this.plant_id.toString())
                .limitToLast(1);
            

        }

        // saveStateToLocalStorage() {
        //     // for every item in React state
        //     for (let key in this.state) {
        //         // save to localStorage
        //         localStorage.setItem(key, JSON.stringify(this.state[key]));
        //     }
        // }
        // hydrateStateWithLocalStorage() {
        //     // for all items in state
        //     for (let key in this.state) {
        //     // if the key exists in localStorage
        //     if (localStorage.hasOwnProperty(key)) {
        //     // get the key's value from localStorage
        //         let value = localStorage.getItem(key);

        //     // parse the localStorage string and setState
        //         try {
        //             value = JSON.parse(value);
        //             this.setState({ [key]: value });
        //             } catch (e) {
        //             // handle empty string
        //             this.setState({ [key]: value });
        //             }
        //         }
        //     }
        // }
        componentDidMount(){
            console.log('DidMount EnvCond: ',this.props)
            // this.hydrateStateWithLocalStorage();
            // //
            // window.addEventListener(
            //     "beforeunload",
            //     this.saveStateToLocalStorage.bind(this)
            // );

            //! capture from firebase instead!
            this.temp_ref.on("child_added",  (snapshot) => {
                let val = snapshot.val()
                if(LOG_ENV_COND){
                    console.log('Received Temp data from fb:')
                    console.log(val)
                }
                if (val !== null){
                    console.log('val : ', val)
                    this.setState({
                        temp_value: val.data,
                        last_update_temp : new Date(Date.parse(val.date)).toISOString()
                    })
                }else{
                    this.setState({
                        temp_value: null,
                        last_update_temp : null
                    })
                }
                
            },{context : this});
            this.light_ref.on("child_added", function (snapshot) {
                let val = snapshot.val()
                if(LOG_ENV_COND){
                    console.log('Received Light data from fb:')
                    console.log(val)
                }
                
                if (val !== null){
                    this.setState({
                        light_value: val.data,
                        last_update_light : new Date(Date.parse(val.date)).toISOString()
                    })
                }else{
                    this.setState({
                        light_value: null,
                        last_update_light : null
                    })
                }
            }.bind(this));
            this.humi_ref.on("child_added", function (snapshot) {
                let val = snapshot.val()
                if(LOG_ENV_COND){
                    console.log('Received Humid data from fb:')
                    console.log(val)
                }
                if (val !== null){
                    this.setState({
                        humid_value: val.data,
                        last_update_humid : new Date(Date.parse(val.date)).toISOString()
                    })
                }else{
                    this.setState({
                        humid_value: null,
                        last_update_humid : null
                    })
                }
            }.bind(this));
            this.moist_ref.on("child_added", function (snapshot) {
                let val = snapshot.val()
                if(LOG_ENV_COND){
                    console.log('Received Moisture data from fb:')
                    console.log(val)
                }
                
                if (val !== null){
                    this.setState({
                        moisture_value: val.data,
                        last_update_moisture : new Date(Date.parse(val.date)).toISOString()
                    })
                }else{
                    this.setState({
                        moisture_value: null,
                        last_update_moisture : null
                    })
                }
            }.bind(this));
        }

        // componentWillUnmount(){
        //     window.removeEventListener(
        //         "beforeunload",
        //         this.saveStateToLocalStorage.bind(this)
        //     );
        //       // saves if component has a chance to unmount
        //     this.saveStateToLocalStorage();
        //     if (this.client)
        //         this.client.end()
        // }
        render() {
            console.log('Rendering: ' , this.state)
            return(
                <div className={style.row}>
                    <Card className="text-center" >
                        <center>Temperature</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div >
                            <p className={style.description}>{this.state.temp_value?this.state.temp_value+' Celsius':'No data'}</p>
                            <p className={style.date__year}>{this.state.last_update_temp ? this.state.last_update_temp:''}</p>
                        </div>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <center>Air Humidity</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div className={style.column}>
                            <p className={style.description}>{this.state.humid_value?this.state.humid_value+' %':'No data'}</p>
                            <p className={style.date__year}>{this.state.humid_value?this.state.last_update_humid:''}</p>
                        </div>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <center>Brightness</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div className={style.column}>
                            <p className={style.description}>{this.state.light_value?this.state.light_value:'No data'}</p>
                            <p className={style.date__year}>{this.state.light_value?this.state.last_update_light:''}</p>
                        </div>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <center>Soil's Moisture</center>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div className={style.column}>
                            <p className={style.description}>{this.state.humid_value?this.state.moisture_value+' %':'No data'}</p>
                            <p className={style.date__year}>{this.state.humid_value?this.state.last_update_moisture:''}</p>
                        </div>
                        </Card.Body>
                    </Card>
                </div>
                )
            }
    }

export default EnvCond