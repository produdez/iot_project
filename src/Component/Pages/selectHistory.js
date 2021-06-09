import React, {Component} from 'react'
import styles from './selectHistory.module.css'
import {Link} from 'react-router-dom';
export default class selectHistory extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div className={styles.container}>
                <Link to="/envhistory" style={{ textDecoration: 'none' }}><button href="" className={styles.btn1}>Environment History</button> </Link>
                <Link to="/wathistory" style={{ textDecoration: 'none' }}><button href="" className={styles.btn1}>Watering History</button> </Link>
          </div>
        );
    }
}