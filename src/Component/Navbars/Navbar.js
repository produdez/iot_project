import React, {Component} from 'react';
import NavButton from '../Buttons/NavButton.js';
import styles from './Navbar.module.css'
export default class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            userName: '',
            isLogin:'',
        };
    }
    render(){
        return(
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.nav__logo}>Irrigation System</div>

                    <ul className={styles.nav__links}>
                        <li className={styles.nav__item}>
                            <NavButton >Overview</NavButton>
                        </li>
                        <li className={styles.nav__item}>
                            <NavButton >History</NavButton>
                        </li>
                        <li className={styles.nav__item}>
                            <NavButton >Environment Condition</NavButton>
                        </li>
                        <li className={styles.nav__item}>
                            <NavButton >Login</NavButton>
                        </li>
                        <li className={styles.nav__item}>
                            <NavButton >Register</NavButton>
                        </li>      
                        {/* {!this.state.isLogin ?
                        [
                        <li className="nav__item">
                            <NavButton >Login</NavButton>
                        </li>,
                        <li className="nav__item">
                            <NavButton >Register</NavButton>
                        </li>      
                        ] :  [
                            <li className="nav__item">
                            <NavButton >Watering settings</NavButton>
                        </li>
                        ]  
                        }         */}
                    </ul>
                </nav>
            </header>)
    }
}
