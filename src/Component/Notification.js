import React , {useState } from "react"
import { Card, Button, ListGroup } from "react-bootstrap"
// import { useAuth } from "../Context/AuthContext"
// import { useHistory } from "react-router-dom";
import firebase from "firebase/app"

//! data type definition

var NTYPE = {
    1: ['Hot', 'Fkin Hot Mate'],
    2: ['Cold', 'Fkin Cold Mate'],
    3: ['Dark', 'Fkin Dark Mate'],
    4: ['Bright', 'Fkin Bright Mate'],
    5: ['Soggy', 'Fkin Soggy Mate'],
    6: ['Dry', 'Fkin Dry Mate'],
    7: ['WaterTime', 'Fkin WaterTime Mate'],
    8: ['Error', 'Fkin Error Mate']
}

export const DUMMY_NOTIFICATION = [
    {plant_id: 1, plant_name: 'Plant 1', notification_type: NTYPE[1][0]},
    {plant_id: 2, plant_name: 'Plant 2', notification_type: NTYPE[2][0]},
    {plant_id: 3, plant_name: 'Plant 3', notification_type: NTYPE[3][0]},
    {plant_id: 4, plant_name: 'Plant 4', notification_type: NTYPE[4][0]},
    {plant_id: 5, plant_name: 'Plant 5', notification_type: NTYPE[5][0]},
    {plant_id: 6, plant_name: 'Plant 6', notification_type: NTYPE[6][0]},
    {plant_id: 7, plant_name: 'Plant 7', notification_type: NTYPE[7][0]},
    {plant_id: 8, plant_name: 'Plant 8', notification_type: NTYPE[8][0]},
    {plant_id: 9, plant_name: 'Plant 9', notification_type: NTYPE[1][0]},
    {plant_id: 10, plant_name: 'Plant 10', notification_type: NTYPE[2][0]},
    {plant_id: 11, plant_name: 'Plant 11', notification_type: NTYPE[3][0]}
];



const get_noti_message = (noti_type) => {
    for(let [key,value] of Object.entries(NTYPE)){
        if( value[0] === noti_type) return value[1]
    }
    return noti_type
}

//! front end code

export default class Notification extends React.Component { 
    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          data: {},
          ref: firebase.database().ref('Notification'),
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
                    {this.state.loading && <div>Loading ...</div>}
                    {!this.state.loading && this.notidiv()}
                </Card>
            </div>);
    }

    notidiv(){
        if (this.state.data == null){
            return(
            <>
                'No notifications for now, looking goood!'
                <button onClick={this.add_dummy_notification.bind(this)}>Populate Dummy notifications</button>
            </>);
            
        }
        return (
            <>
            <h3>Go to corresponding plant using the GO button</h3>
            <button onClick={this.add_dummy_notification.bind(this)}>Populate Dummy notifications</button>
            {/* <button onClick={this.delete_noti_data.bind(this)}>Delete Data</button> */}
            <Card.Body>
                <ListGroup>
                    {this.getListItem(this.state.data)}
                </ListGroup>
            </Card.Body>
            </>
        );
    }

    delete_noti_data(){
        console.log('Active delete_noti_data!');
        // this.state.ref.remove()
    }
    add_dummy_notification(){

        const ref = this.state.ref
        DUMMY_NOTIFICATION.forEach(function(currentValue, index, arr){
            console.log(currentValue);
            var newRef = ref.push();
            newRef.set(currentValue);
        }, null);

    }


    getListItem(noti_list){
        // return [];
        return Object.entries(noti_list).map((noti_json) => 
        {
            let [key,val] = noti_json;
            return (
            <ListGroup.Item key = {key} variant="info">
                {val.plant_name}
                <span className='p-3'>{get_noti_message(val.notification_type)}</span>
                <Button  value = {noti_json} variant="dark" onClick={() => this.OnClickNotification(noti_json)}>Go</Button>{' '}
            </ListGroup.Item>
            );
        });
    }

    OnClickNotification(noti_json){
        let [key,val] = noti_json
        console.log('Deling noti:',key);
        console.log('Routing to', val.plant_name);
        
        //TODO: route to appropriate plant
        // this.props.history.push('/plant')

        //del noti from db
        var ref = firebase.database().ref('Notification/' + key);
        ref.remove();
    }
}
 

    



