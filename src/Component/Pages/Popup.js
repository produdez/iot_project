import React ,{Component} from 'react';
import styles from './Popup.module.css'
import Moisture from "../Pics/moisture-icon.jpg"
import Temperature from "../Pics/temp-icon.png"
import Light from "../Pics/light-icon.png"
import Hudmidity from "../Pics/humidity-icon.jpg"
export default class PlantSetting extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgSrc: [Moisture, Temperature, Hudmidity, Light],
        }
    }
   
    render(){
        if (this.props.displaying) {
        return (
            <div className={styles.modal}>
                <button className={styles.btn__closeModal} onClick={() => this.props.tutorialPopupDisplayingState_setter(false)}>&times;</button>
                <img
          src={this.state.imgSrc[this.props.val]}
          className={styles.modal__logo}
          id="logo"
        />
                <h2 className={styles.modal__header} >{this.props.type} tutorial</h2>
                <div className={styles.modal__form}>
                <p>DESCRIPTION</p>
                <button className={styles.btn} onClick={() => this.props.tutorialPopupDisplayingState_setter(false)}>OK!</button>
                </div>
            </div>
        );
        }
        return "";
    }
  
}