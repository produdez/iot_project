import React from 'react';
import NavButton from '../Buttons/NavButton.js';
import styles from './Navbar.module.css'
import {Link,useHistory,  Redirect} from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext"
//import NavDropdown from 'react-bootstrap'

export default function Navbar(){
        console.log(localStorage.getItem('user-info'))
        const currentUser = useAuth()
        const logout = useAuth()
        const history = useHistory()
        function logOut() {
            if (currentUser) logout()
            localStorage.clear()
            window.location.reload(false)
            history.push("/")
        }
        return(
            <header className={styles.header}>
                <nav className={styles.nav}>
                <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                    <div className={styles.nav__logo}>Irrigation System</div>
                    </Link>
                    <ul className={styles.nav__links}>
                        {
                            localStorage.getItem("user-info")?
                            <>
                            <li className={styles.nav__item}>
                            <Link to="/plant" style={{ textDecoration: 'none' }}><NavButton >Plant Settings</NavButton>
                            </Link>
                            </li>
                            <li className={styles.nav__item}>
                                <Link to="/sehistory" style={{ textDecoration: 'none' }}><NavButton >History</NavButton></Link> 
                            </li>
                            <li className={styles.nav__item}>
                                <Link to="/envcond" style={{ textDecoration: 'none' }}><NavButton >Environment Condition</NavButton>
                                </Link>
                            </li>

                            <li className={styles.nav__item}>
                                <Link to="/notification" style={{ textDecoration: 'none' }}><NavButton >Notifications</NavButton></Link> 
                            </li>
                            <li className={styles.nav__item}>
                                <div onClick={logOut} style={{ textDecoration: 'none' }}><NavButton > Logout </NavButton></div>
                            </li>
                            </>
                            :
                            <>
                                <Redirect to="/login"/>
                                <li className={styles.nav__item}>
                                    <Link  to="/login" style={{ textDecoration: 'none' }}><NavButton>Login</NavButton></Link>
                                </li>
                                <li className={styles.nav__item}>
                                    <Link to="signup" style={{ textDecoration: 'none' }}><NavButton >Register</NavButton></Link> 
                                </li>
                            </>
                        }

                    </ul>
                </nav>
            </header>)
    }

