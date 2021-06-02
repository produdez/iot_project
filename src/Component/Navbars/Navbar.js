import React, {Component} from 'react';
import NavButton from '../Buttons/NavButton.js';
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext"


export default function Navbar(){
        const currentUser = { useAuth}
   
        return(
            <header className={styles.header}>
                <nav className={styles.nav}>
                <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                    <div className={styles.nav__logo}>Irrigation System</div>
                    </Link>

                    <ul className={styles.nav__links}>

                        <li className={styles.nav__item}>
                            <Link to="/plant" style={{ textDecoration: 'none' }}><NavButton >Plant Settings</NavButton>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link to="/history" style={{ textDecoration: 'none' }}><NavButton >History</NavButton></Link> 
                        </li> 
                        <li className={styles.nav__item}>
                            <Link to="/envcond" style={{ textDecoration: 'none' }}><NavButton >Environment Condition</NavButton>
                            </Link>
                        </li>

                        <li className={styles.nav__item}>
                            <Link to="/notification" style={{ textDecoration: 'none' }}><NavButton >Notifications</NavButton></Link> 
                        </li> 
                        
                        { !currentUser &&
                        <>
                            <li className={styles.nav__item}>
                            <Link  to="/login" style={{ textDecoration: 'none' }}><NavButton>Login</NavButton></Link>
                            </li>
                            <li className={styles.nav__item}>
                                <Link to="signup" style={{ textDecoration: 'none' }}><NavButton >Register</NavButton></Link> 
                            </li>
                        </>
                        }
                        {
                            currentUser &&
                            <li className={styles.nav__item}>
                            <Link to = "/logout" style={{ textDecoration: 'none' }}><NavButton > Logout </NavButton></Link>
                            </li>
                        }
                        
   
                  
                
                  
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

