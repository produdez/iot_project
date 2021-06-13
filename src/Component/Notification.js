import React , {useState } from "react"
import { Card} from "react-bootstrap"
import { Link } from "react-router-dom";
import CardFake from './Card';
import styles from './Notification.module.css'
// import { useAuth } from "../Context/AuthContext"
// import { useHistory } from "react-router-dom";
import firebase from "firebase/app"


export default class Notification extends React.Component { 
    constructor(props) {
        super(props);
     
        this.state = {
            plant_id: this.props.plant.id,
            loading: false,
            data: {},
            ref: firebase.database().ref('Notification').orderByChild('plant_id')
            .equalTo(this.props.plant.id.toString())
        };
    }

    componentDidMount(){
        this.setState({loading: true})
        this.state.ref.on('value', (snapshot) => {
            // this.state.data = snapshot.val()
            this.setState({data : snapshot.val()})
            console.log(this.state.data);
            console.log(typeof this.state.data);
            this.setState({loading: false})
        });
    }

    render(){
        return(
            <div>
                <Card>
                    {/* <h2> Notifications </h2> */}
                    <Link to = '/notification' onClick = {() => this.delete_noti_data()} style={{ margin: 'auto' }}> Clear Notifications </Link>
                    {this.state.loading && <div>Loading ...</div>}
                    {!this.state.loading && this.notificationSection()}
                </Card>
            </div>);
    }

    notificationSection(){
        if (this.state.data == null){
            return(
            <>
                'No notifications for now, looking goood!'
            </>);
            
        }
        return (
            <>
            {/* <h3>Go to corresponding plant using the GO button</h3> */}
            {/* <button onClick={this.delete_noti_data.bind(this)}>Delete Data</button> */}
            <div>
            <CardFake className={styles.notification}>
                 <ul className={styles.notificationList}>
                    {this.notificationList(this.state.data)}
                </ul>
            </CardFake>
            </div>
            </>
        );
    }

    
    delete_noti_data(){
        const noti_ref = firebase.database().ref('Notification');
        console.log('Active delete_noti_data!');
        this.state.ref.once('value', snapshot => {
            var updates = {};
            snapshot.forEach(function(child) {
                updates["/"+child.key] = null;
            });
            noti_ref.update(updates);
        });
    }


    notificationList(noti_list){
        // return [];
    
        return Object.entries(noti_list).map((noti_json) => 
        {
            let [key,json] = noti_json;
          
        
            return (
                    <li>
                    {/* <ListGroup.Item key = {key} variant="info"> */}
                        {/* {JSON.stringify(json)} */}
                        <CardFake className={styles.notificationItem}>
                       
                        {/* <Button variant="dark" value = {noti_json}  onClick={() => this.OnClickNotification(noti_json,true)} >{json.plant_name}</Button> */}
                    
                        <div className={styles.notificationDescription}>
                            <Link to="/plant_settings" className={styles.notificationMessage} style={{ textDecoration: 'none' }}><div >{translateType(json.name)}: {}
                            {json.data}{json.unit} {}
                            {translateSign(json.sign)[0]} compared to {}
                            {translateSign(json.sign)[1]} Threshold of: {json.threshold}{json.unit}</div></Link>
                            <button className={styles.notificationItem__delete} onClick={() => this.OnClickNotification(noti_json)}>Delete</button>
                        </div>
                        
                        </CardFake>
                    {/* </ListGroup.Item> */}
                    </li>
            );
        });
    }

    OnClickNotification(noti_json,route = false){
        let [key,val] = noti_json
        console.log('Deling noti:',key);
        console.log('Routing to', val.plant_name);
        
        //TODO: route to appropriate plant
        if(route) this.props.history.push('/plant')

        //del noti from db
        var ref = firebase.database().ref('Notification/' + key);
        ref.remove();
    }
}

const SOIL = 'SOIL';
const TEMP = 'TEMP';
const HUMID = 'HUMID';
const LIGHT = 'LIGHT'
function translateType(type){
    if (type === SOIL) return 'Soil Moisture';
    if (type === TEMP) return 'Temperature';
    if (type === HUMID) return 'Air Humidity';
    if (type === LIGHT) return 'Lighting Condition';
}
const HIGHER = '>';
const LOWER = '<'
function translateSign(sign){
    if(sign === HIGHER) return ['Too High','Max'];
    if(sign === LOWER) return ['Too Low','Min'];
}
  



