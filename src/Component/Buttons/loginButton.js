import React, {Component} from 'react'
import classes from './loginButton.module.css'

const loginButton = props => {
    return <button className={classes.button} onClick={props.onClick}>{props.children}</button>
}

export default loginButton