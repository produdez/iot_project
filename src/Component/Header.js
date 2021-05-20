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
                <p className={style.title}>Automatic watering system for plants using Arduino</p>
            </div>
            <div className={style.column}>
                <p className={style.description}>Build better customer relationships with system by using web application that provides a more convinient for you to keep track of environment conditions and be able to remote control</p>
                <Link to="/login"><button className={style.buttonTrial} >A free trial</button></Link>
                
            </div>
        </div>)
    }
}

