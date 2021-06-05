import React , {Component} from 'react'
import classes from './seperateHistory.module.css'
import {Link} from 'react-router-dom';
export default function SeperateHistory() {
        return(
            <div className={classes.container}>
                    <Link to="/nohistory" style={{ textDecoration: 'none' }}>
                    <button className={classes.btn}>Notification history</button>
                    </Link>
                    <Link to="/history" style={{ textDecoration: 'none' }}>
                    <button className={classes.btn}>Activity history</button>
                    </Link>
            </div>
        );

}   