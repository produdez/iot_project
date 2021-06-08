import React, { useRef, useState } from "react"
import { useAuth } from "../../Context/AuthContext";
import NavButton from '../Buttons/NavButton.js';
import styles from './Navbar.module.css'
import {Link,useHistory,  Redirect} from 'react-router-dom';
import { auth } from "../../firebase"
import {NavDropdown, DropdownButton} from 'react-bootstrap'

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

    const [dropDownValue, setDropDownValue] = useState("Plant 1")
    return(
        <>
        <header className={styles.header}>
            <nav className={styles.nav}>
            <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                {currentUser ? null : <div className={styles.nav__logo}>Irrigation System</div>}
                </Link>
                <ul className={styles.nav__links}>
                    {
                        (currentUser)?
                            <NavDropdown className={styles.nav_drop} title={
                                    <span className="color-dark my-auto" style={{color:'black' }}>{dropDownValue}</span>
                                }>
                                <NavDropdown.Item ><div onClick={(e)=>setDropDownValue(e.target.textContent)}>Plant 1</div></NavDropdown.Item>
                                <NavDropdown.Item ><div onClick={(e)=>setDropDownValue(e.target.textContent)}>Plant 2</div></NavDropdown.Item>
                                <NavDropdown.Item disabled>Plant 3</NavDropdown.Item>
                            </NavDropdown>
                            :
                            null
                    }

                    {
                        (currentUser)?
                        <>
                        <li className={styles.nav__item}>
                            <Link to="/" style={{ textDecoration: 'none' }}><NavButton >Home</NavButton>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
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
                            <Link to="/history" style={{ textDecoration: 'none' }}><NavButton >History</NavButton>
                            </Link>
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
