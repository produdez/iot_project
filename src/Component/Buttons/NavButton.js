import React, {useState} from 'react'
import './NavButton.css'

const NavButton = (props) => {
    let className = 'button';
    if(props.isActive){
        className += ' button--active';
    }
    return <button className={className} onClick={props.onClick}>{props.children}</button>
}

export default NavButton