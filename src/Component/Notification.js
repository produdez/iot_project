import React , {useState } from "react"
import { Card, Button, ListGroup } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { useHistory } from "react-router-dom";

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



class NotificationRecord {

    constructor(id,plant, time, notification_type, message) {

      this.time = time
      this.id = id
      this.notification_type = notification_type
      this.message = message
      this.plant = plant
    }
    to_json(){
        return {}
    }
    toString(){
        return '[Plant: '+ this.plant.toString() +  ', Time: '+ this.time.toDateString() + ', Type: '+ this.notification_type+  ', Mess: '+ this.message + ']';
    }
  }

function get_fake_data(){
    var n = 8;
    var data = []
    for (var i = 1; i<=n; i++){
        var date = new Date(2020 + i, i, i%7);
        var plant = 'Plant' + Number(i).toString()
        data.push(new NotificationRecord(i,plant,date, NTYPE[i][0], NTYPE[i][1]))
    }
    return data
}

var NOTI_REC_LISTS = get_fake_data()


//! front end code


export default function Notification() { 
    const history = useHistory()
    const [listItems, setListItems] = useState([getListItem(NOTI_REC_LISTS)]);



    function getListItem(noti_list){
        return noti_list.map((item) => notiRecToListItem(item,history))
    }
    function notiRecToListItem(item,history){
    
        //TODO: link this to specific plant page and also delete notification
        function onClickNotification(notification){
            // console.log('Clicked on link for notification: ', notification);
            // history.push('/notification/plants')
            deleteNotification(notification)
        }

        return (
        <ListGroup.Item key = {item.id} variant="info">
            Noti: 
            <span className='p-3'>{item.toString()}</span>
            <Button  value = {item} variant="dark" onClick={() => onClickNotification(item)}>Go</Button>{' '}
        </ListGroup.Item>
        );
    }


    //TODO: call api to del from db and refresh
    function deleteNotification(notification){
        console.log('Deling noti:',notification , ' index: ' );
        NOTI_REC_LISTS.splice(NOTI_REC_LISTS.indexOf(notification),1  );
        setListItems(getListItem(NOTI_REC_LISTS));
    }

    if (listItems.length === 0){
        return (<Card>
            <h2> Notifications </h2>
            No notifications for now, looking goood!
        </Card>)
        
    }
    return (
        <>
        <Card>
            <h2> Notifications </h2>
            <Card.Body>
                <ListGroup>
                    {listItems}
                </ListGroup>
            </Card.Body>
        </Card>
        </>
    )
}
