import React, { useRef, useState } from "react"
import { useAuth } from "../../Context/AuthContext";
import NavButton from '../Buttons/NavButton.js';
import styles from './Navbar.module.css'
import {Link,useHistory,  Redirect} from 'react-router-dom';
import { auth } from "../../firebase"

import NavDropdown from 'react-bootstrap'

export default function Navbar(){
    // console.log(localStorage.getItem('user-info'));
    const { currentUser } = useAuth();
    const [value,setValue] = useState();
    const [error, setError] = useState("")
    const history = useHistory();

    async function handleLogout() {
        // setValue({});
        setError("")
        // console.log('User after logout: ',currentUser)

        try {
          await auth.signOut()
          history.push("/login")
          
        } catch {
          setError("Failed to log out")
        }
      }
    // setError("");
    return(
        <>
        <header className={styles.header}>
            <nav className={styles.nav}>
            <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                <div className={styles.nav__logo}>Irrigation System</div>
                </Link>
                <ul className={styles.nav__links}>
                    {
                        (currentUser)?
                        <>
                        <li className={styles.nav__item}>
                        {/* <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                            <NavButton >Test Button </NavButton>
                        </Link> */}
                        <Link to="/plant" style={{ textDecoration: 'none' }}>
                            <NavButton >Plant Settings</NavButton>
                        </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link to="/envcond" style={{ textDecoration: 'none' }}><NavButton >Environment Condition</NavButton>
                            </Link>
                        </li>

                        <li className={styles.nav__item}>
                            <Link to="/notification" style={{ textDecoration: 'none' }}><NavButton >Notifications</NavButton></Link> 
                        </li>
                        <li className={styles.nav__item}>
                            <div onClick={handleLogout} style={{ textDecoration: 'none' }}><NavButton > Logout </NavButton></div>
                        </li>
                        </>
                        :
                        <>

                            {/* <Redirect to="/login"/> */}
                            <li className={styles.nav__item}>
                                <Link  to="/login" style={{ textDecoration: 'none' }}><NavButton>Login</NavButton></Link>
                            </li>
                            <li className={styles.nav__item}>
                                <Link to="/signup" style={{ textDecoration: 'none' }}><NavButton >Register</NavButton></Link> 
                            </li>
                        </>
                    }

                </ul>
            </nav>
        </header>
        </>)
}