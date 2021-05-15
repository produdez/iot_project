import React, {Component} from 'react';
import NavButton from './Buttons/NavButton.js';
import loginButton from './Buttons/loginButton';
import signUpButton from './Buttons/signUpButton.js';
import './Navbar.css'
export default class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            userName: '',
        };
    }
    render(){
        return(
            <header className="header">
                <nav className="nav">
                    <div className="nav__logo">Irrigation System</div>

                    <ul className="nav__links">
                        <li className="nav__item" >
                            <NavButton>Overview</NavButton>
                        </li>
                        <li className="nav__item" >
                            <NavButton>History</NavButton>
                        </li>
                        <li className="nav__item" >
                            <NavButton>Environment Condition</NavButton>
                        </li>
                        <li className="nav__item" styles={{backgroundColor:"blue"}}>
                            <NavButton >Login</NavButton>
                        </li>
                        <li className="nav__item">
                            <NavButton>Register</NavButton>
                        </li>                 
                    </ul>
                </nav>
            </header>)
    }
}
