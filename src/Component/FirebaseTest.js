import React from "react";
import firebase from "firebase/app"

class FirebaseTest extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickConnect = () => {
    console.log('click Connect')
    var ref = firebase.database().ref('sensor');
    ref.on('value', (snapshot)=>{
      const data = snapshot.val();
      console.log(data); // eveytime something in database/sensor change, it will print all database/sensor/* out, haven't add promise (error control) yet
    });
  }

  onClickDisconnect = () => {
    console.log('click Disconnect')
    var ref = firebase.database().ref('sensor');
    ref.off();
  }

  onClickWrite = () => {
    console.log('write to s1 with value 3')
    var ref = firebase.database().ref('sensor/s1');
    ref.set(3);
  }

  onClickWrite1 = () => {
    console.log('write to s1 with value 1')
    var ref = firebase.database().ref('sensor/s1');
    ref.set(1);
  }

  addNode = () => {
    console.log('add node s5')
    let auto = false;

    if (auto) {
      // auto key
      var ref = firebase.database().ref('sensor');
      var newRef = ref.push();
      newRef.set({
        's5': -18
      });
    } else {
      // manual key
      var ref = firebase.database().ref('sensor/s5');
      ref.set(-18);
    }

  }

  delNode = () => {
    console.log('del node s5')
    var ref = firebase.database().ref('sensor/s5');
    ref.remove();
  }

  render() {
    return (
      <div>
        <h1> A simple firebase test (f12 in console)</h1>
        <h1> Cannot run ?  ask Khoa to get firebase config file</h1>
        <button onClick={this.onClickConnect}>Connect database </button>
        <br></br>
        <button onClick={this.onClickDisconnect}>Disconnect database </button>
        <br></br> <br></br>

        <button onClick={this.onClickWrite}>Write database s1 = 3 </button>
        <br></br>
        <button onClick={this.onClickWrite1}>Write database s1 = 1 </button>
        <br></br> <br></br>

        <button onClick={this.addNode}>Add node s5 to database </button>
        <br></br>
        <button onClick={this.delNode}>Delete node s5 from database </button>
      </div>
      
    );
  }
}

export default FirebaseTest;