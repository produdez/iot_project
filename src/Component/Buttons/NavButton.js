import React from 'react'
import classes from './NavButton.module.css'

const NavButton = props => {
    return <button className={classes.button} onClick={props.onClick}>{props.children}</button>
}

export default NavButton