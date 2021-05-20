import React, {Component} from 'react';
import style from './Header.module.css';
import {Link} from 'react-router-dom';
export default class Header extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(  
        <div className={style.row}>
            <div className={style.column}>
                <p className={style.title}>Automatic Watering System using Arduino</p>
            </div>
            <div className={style.column}>
                <p className={style.description}> Our website aims to provide your smart garden with the care it needs! </p>
                {/* <button className={style.buttonTrial}>A free trial</button> */}
            </div>
        </div>)
    }
}

