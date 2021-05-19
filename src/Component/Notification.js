import React , {useState } from "react"
import { Card, Button, ListGroup } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { useHistory } from "react-router-dom";
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

const notification_list = [
    {id: 1, plant_id: 1, plant_name: 'Plant 1', notification_type: NTYPE[1][0]},
    {id: 2, plant_id: 2, plant_name: 'Plant 2', notification_type: NTYPE[2][0]},
    {id: 3, plant_id: 3, plant_name: 'Plant 3', notification_type: NTYPE[3][0]},
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
                    <h2> Notifications </h2>
                    {this.state.loading && <div>Loading ...</div>}
                    {!this.state.loading && this.notidiv()}
                </Card>
            </div>);
    }

    notidiv(){
        if (Object.keys(this.state.data).length === 0){
            return 'No notifications for now, looking goood!';
        }
        return (
            <>
            <p>Go to corresponding plant using the GO button</p>
            <Card.Body>
                <ListGroup>
                    {this.getListItem(this.state.data)}
                </ListGroup>
            </Card.Body>
            </>
        );
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
                <Button  value = {val} variant="dark" onClick={() => this.OnClickNotification(val)}>Go</Button>{' '}
            </ListGroup.Item>
            );
        });
    }

    //TODO: update plant routing when plant is properly routed
    OnClickNotification(noti_val){
        console.log('Deling noti:',noti_val);
        console.log('Routing to', noti_val.plant_name);
        this.props.history.push('/plant')
    }
}
 

    



