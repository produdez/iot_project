import React, { useRef, useState, useEffect } from "react"
import style from './EnvCond.module.css';
import {Card} from "react-bootstrap"
import firebase from "firebase/app"
import temp_icon from "./Pics/temp-icon.png"
import humidity_icon from "./Pics/humidity-icon.jpg"
import light_icon from "./Pics/light-icon.png"
import moisture_icon from "./Pics/moisture-icon.jpg"



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
                style1: style.init_column,
                style2: style.init_column,
                style3: style.init_column,
                style4: style.init_column_right,
                ready: false,
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

        update1(){
            this.setState({style1: style.update})
            setTimeout(function(){
                this.setState({style1: style.column})
              }.bind(this), 1000);
        }
        update2(){
            this.setState({style2: style.update})
            setTimeout(function(){
                this.setState({style2: style.column})
              }.bind(this), 1000);
        }
        update3(){
            this.setState({style3: style.update})
            setTimeout(function(){
                this.setState({style3: style.column})
              }.bind(this), 1000);
        }
        update4(){
            this.setState({style4: style.update_right})
            setTimeout(function(){
                this.setState({style4: style.column_right})
              }.bind(this), 1000);
        }


        async componentWillMount(){
            // this.hydrateStateWithLocalStorage();
            // //
            // window.addEventListener(
            //     "beforeunload",
            //     this.saveStateToLocalStorage.bind(this)
            // );

            //! capture from firebase instead!
            await this.temp_ref.on("child_added",  (snapshot) => {
                let val = snapshot.val()
                if(LOG_ENV_COND){
                    console.log('Received Temp data from fb:')
                    console.log(val)
                }
                if (val !== null){
                    this.setState({
                        temp_value: val.data,
                        last_update_temp : new Date(Date.parse(val.date)).toISOString()
                    })
                    if(this.state.ready) this.update1()
                }else{
                    this.setState({
                        temp_value: null,
                        last_update_temp : null
                    })
                }

            },{context : this});
            await this.light_ref.on("child_added", function (snapshot) {
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
                    if(this.state.ready) this.update2()
                }else{
                    this.setState({
                        light_value: null,
                        last_update_light : null
                    })
                }
            }.bind(this));
            await this.humi_ref.on("child_added", function (snapshot) {
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
                    if(this.state.ready) this.update3()
                }else{
                    this.setState({
                        humid_value: null,
                        last_update_humid : null
                    })
                }
            }.bind(this));
            await this.moist_ref.on("child_added", function (snapshot) {
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
                    if(this.state.ready) this.update4()
                }else{
                    this.setState({
                        moisture_value: null,
                        last_update_moisture : null
                    })
                }
            }.bind(this));

            this.setState({ready: true})
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
            return(
                <div className={style.row}>

                    <Card className={this.state.style1}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div >
                            <center className={style.title}><img src={temp_icon} alt="" width={20} height={"auto"}/> Temperature</center>
                            <p className={style.description}>{this.state.temp_value?<>{this.state.temp_value} <>&deg;C</></>:'No data'}</p>
                            <p className={style.date__year}> {this.state.last_update_temp ? "Last update: "+this.state.last_update_temp.replace("T","-").replace(/....Z/i,""):''}</p>
                        </div>
                        </Card.Body>
                    </Card>

                    <Card className={this.state.style2}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div >
                            <center className={style.title}><img src={humidity_icon} alt="" width={50} height={"auto"}/> Humidity</center>
                            <p className={style.description}>{this.state.humid_value?this.state.humid_value+' %':'No data'}</p>
                            <p className={style.date__year}>{this.state.humid_value?"Last update: "+this.state.last_update_humid.replace("T","-").replace(/....Z/i,""):''}</p>
                        </div>
                        </Card.Body>
                    </Card>

                    <Card className={this.state.style3}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div>
                            <center className={style.title}><img src={light_icon} alt="" width={50} height={"auto"}/> Brightness</center>
                            <p className={style.description}>{this.state.light_value?this.state.light_value:'No data'}</p>
                            <p className={style.date__year}>{this.state.light_value?"Last update: "+this.state.last_update_light.replace("T","-").replace(/....Z/i,""):''}</p>
                        </div>
                        </Card.Body>
                    </Card>

                    <Card className={this.state.style4}>
                        <Card.Body className="d-flex align-items-center justify-content-center">
                        <div>
                            <center className={style.title}><img src={moisture_icon} alt="" width={50} height={"auto"}/> Soil Moisture</center>
                            <p className={style.description}>{this.state.moisture_value?this.state.moisture_value+' %':'No data'}</p>
                            <p className={style.date__year}>{this.state.moisture_value?"Last update: "+this.state.last_update_moisture.replace("T","-").replace(/....Z/,""):''}</p>
                        </div>
                        </Card.Body>
                    </Card>
                </div>
                )
            }
    }

export default EnvCond