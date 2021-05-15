import React, {Component} from 'react'
import classes from './signUpButton.module.css'

const signUpButton = props => {
    return (<button className={classes.button} onClick={props.onClick}>{props.children}</button>);
}

export default signUpButton